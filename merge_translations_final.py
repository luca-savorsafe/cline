#!/usr/bin/env python3
"""
合并翻译文件脚本 - 最终版本
将源语言文件（zh-CN）中的翻译合并到目标语言文件（en）中
重复的部分不合并，只添加目标文件中不存在的键
"""

import json
import sys
import os
from typing import Dict, Any, Union, List, Tuple

def deep_merge(source: Dict[str, Any], target: Dict[str, Any], path: str = "") -> Tuple[Dict[str, Any], List[str]]:
    """
    深度合并两个字典，只将源字典中不存在于目标字典的键添加到目标字典
    递归处理嵌套字典
    
    Args:
        source: 源字典
        target: 目标字典
        path: 当前路径（用于调试）
    
    Returns:
        Tuple[合并后的字典, 新增键的路径列表]
    """
    result = target.copy()
    added_keys = []
    
    for key, value in source.items():
        current_path = f"{path}.{key}" if path else key
        
        if key not in result:
            # 如果键不存在于目标字典，直接添加
            result[key] = value
            added_keys.append(current_path)
        elif isinstance(value, dict) and isinstance(result[key], dict):
            # 如果两个值都是字典，递归合并
            merged_subdict, sub_added_keys = deep_merge(value, result[key], current_path)
            result[key] = merged_subdict
            added_keys.extend(sub_added_keys)
        # 如果键已存在且不是字典，或者源值是字典但目标值不是字典，则保留目标值
        # 这是为了不覆盖现有的翻译
    
    return result, added_keys

def count_keys(data: Union[Dict, Any]) -> int:
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

def get_nested_value(data: Dict, path: str) -> Any:
    """
    根据路径获取嵌套字典中的值
    
    Args:
        data: 字典
        path: 点分隔的路径，如 "chat.browserSession.clineUsingBrowser"
    
    Returns:
        值或None（如果路径不存在）
    """
    keys = path.split('.')
    current = data
    
    for key in keys:
        if isinstance(current, dict) and key in current:
            current = current[key]
        else:
            return None
    
    return current

def merge_translation_files(source_file: str, target_file: str, output_file: str = None, dry_run: bool = False) -> None:
    """
    合并两个翻译JSON文件
    
    Args:
        source_file: 源文件路径（zh-CN）
        target_file: 目标文件路径（en）
        output_file: 输出文件路径（如果不指定，则覆盖目标文件）
        dry_run: 是否只显示将要进行的更改而不实际写入文件
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
        merged_data, added_keys = deep_merge(source_data, target_data)
        
        # 确定输出文件
        if output_file is None:
            output_file = target_file
        
        # 统计信息
        source_keys = count_keys(source_data)
        target_keys_before = count_keys(target_data)
        merged_keys = count_keys(merged_data)
        added_count = len(added_keys)
        
        print(f"\n统计信息:")
        print(f"  源文件键数量: {source_keys}")
        print(f"  目标文件合并前键数量: {target_keys_before}")
        print(f"  合并后键数量: {merged_keys}")
        print(f"  新增键数量: {added_count}")
        
        if added_keys:
            print(f"\n新增的键路径 ({added_count} 个):")
            for i, key_path in enumerate(sorted(added_keys), 1):
                # 获取示例值（只显示前50个字符）
                source_value = get_nested_value(source_data, key_path)
                if isinstance(source_value, str):
                    preview = source_value[:50] + ("..." if len(source_value) > 50 else "")
                    print(f"  {i:3d}. {key_path}: {preview}")
                else:
                    print(f"  {i:3d}. {key_path}: {type(source_value).__name__}")
        
        if not dry_run:
            # 写入输出文件
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump(merged_data, f, ensure_ascii=False, indent=2)
            
            print(f"\n合并完成！输出文件: {output_file}")
        else:
            print(f"\n干运行模式：不会写入文件")
            print(f"如果要实际合并，请移除 --dry-run 参数")
        
    except FileNotFoundError as e:
        print(f"错误: 文件未找到 - {e}")
        sys.exit(1)
    except json.JSONDecodeError as e:
        print(f"错误: JSON解析失败 - {e}")
        sys.exit(1)
    except Exception as e:
        print(f"错误: {e}")
        sys.exit(1)

def main():
    """主函数"""
    import argparse
    
    parser = argparse.ArgumentParser(description='合并翻译JSON文件')
    parser.add_argument('source', help='源文件路径（zh-CN）')
    parser.add_argument('target', help='目标文件路径（en）')
    parser.add_argument('output', nargs='?', help='输出文件路径（可选，默认覆盖目标文件）')
    parser.add_argument('--dry-run', action='store_true', help='只显示将要进行的更改而不实际写入文件')
    
    args = parser.parse_args()
    
    merge_translation_files(args.source, args.target, args.output, args.dry_run)

if __name__ == "__main__":
    main()