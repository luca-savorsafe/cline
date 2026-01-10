#!/usr/bin/env python3
"""
合并翻译文件脚本
将源语言文件（zh-CN）中的翻译合并到目标语言文件（en）中
重复的部分不合并，只添加目标文件中不存在的键
"""

import json
import sys
import os
from typing import Dict, Any, Union

def deep_merge(source: Dict[str, Any], target: Dict[str, Any]) -> Dict[str, Any]:
    """
    深度合并两个字典，只将源字典中不存在于目标字典的键添加到目标字典
    递归处理嵌套字典
    """
    result = target.copy()
    
    for key, value in source.items():
        if key not in result:
            # 如果键不存在于目标字典，直接添加
            result[key] = value
        elif isinstance(value, dict) and isinstance(result[key], dict):
            # 如果两个值都是字典，递归合并
            result[key] = deep_merge(value, result[key])
        # 如果键已存在且不是字典，或者源值是字典但目标值不是字典，则保留目标值
        # 这是为了不覆盖现有的翻译
    
    return result

def merge_translation_files(source_file: str, target_file: str, output_file: str = None) -> None:
    """
    合并两个翻译JSON文件
    
    Args:
        source_file: 源文件路径（zh-CN）
        target_file: 目标文件路径（en）
        output_file: 输出文件路径（如果不指定，则覆盖目标文件）
    """
    try:
        # 读取源文件
        with open(source_file, 'r', encoding='utf-8') as f:
            source_data = json.load(f)
        
        # 读取目标文件
        with open(target_file, 'r', encoding='utf-8') as f:
            target_data = json.load(f)
        
        print(f"读取源文件: {source_file}")
        print(f"读取目标文件: {target_file}")
        
        # 合并数据
        merged_data = deep_merge(source_data, target_data)
        
        # 确定输出文件
        if output_file is None:
            output_file = target_file
        
        # 写入输出文件
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(merged_data, f, ensure_ascii=False, indent=2)
        
        print(f"合并完成！输出文件: {output_file}")
        
        # 统计信息
        source_keys = count_keys(source_data)
        target_keys_before = count_keys(target_data)
        merged_keys = count_keys(merged_data)
        added_keys = merged_keys - target_keys_before
        
        print(f"\n统计信息:")
        print(f"  源文件键数量: {source_keys}")
        print(f"  目标文件合并前键数量: {target_keys_before}")
        print(f"  合并后键数量: {merged_keys}")
        print(f"  新增键数量: {added_keys}")
        
    except FileNotFoundError as e:
        print(f"错误: 文件未找到 - {e}")
        sys.exit(1)
    except json.JSONDecodeError as e:
        print(f"错误: JSON解析失败 - {e}")
        sys.exit(1)
    except Exception as e:
        print(f"错误: {e}")
        sys.exit(1)

def count_keys(data: Union[Dict, Any], count: int = 0) -> int:
    """
    递归计算字典中的键数量
    """
    if not isinstance(data, dict):
        return 0
    
    count = len(data)
    for value in data.values():
        if isinstance(value, dict):
            count += count_keys(value)
    
    return count

def main():
    """主函数"""
    if len(sys.argv) < 3:
        print("用法: python merge_translations.py <源文件> <目标文件> [输出文件]")
        print("示例: python merge_translations.py zh-CN/translation.json en/translation.json")
        print("       python merge_translations.py zh-CN/translation.json en/translation.json en/translation_merged.json")
        sys.exit(1)
    
    source_file = sys.argv[1]
    target_file = sys.argv[2]
    output_file = sys.argv[3] if len(sys.argv) > 3 else None
    
    merge_translation_files(source_file, target_file, output_file)

if __name__ == "__main__":
    main()