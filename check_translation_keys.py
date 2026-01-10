#!/usr/bin/env python3
"""
翻译键完整性检查脚本

该脚本用于检查 webview-ui/src 目录下所有翻译键是否都存在于 
webview-ui/src/locales/en/translation.json 文件中。

使用方法:
    python check_translation_keys.py

输出:
    - 缺失的翻译键列表
    - 未使用的翻译键列表
    - 统计信息
"""

import os
import re
import json
import argparse
from typing import Dict, List, Set, Tuple
from pathlib import Path
from collections import defaultdict


class TranslationKeyChecker:
    """翻译键检查器"""
    
    def __init__(self, webview_src_path: str = "webview-ui/src"):
        self.webview_src_path = Path(webview_src_path)
        self.translation_file_path = self.webview_src_path / "locales" / "en" / "translation.json"
        self.translation_keys: Dict[str, any] = {}
        self.used_keys: Set[str] = set()
        self.missing_keys: Set[str] = set()
        self.unused_keys: Set[str] = set()
        
    def load_translation_keys(self) -> bool:
        """加载翻译键"""
        try:
            with open(self.translation_file_path, 'r', encoding='utf-8') as f:
                self.translation_keys = json.load(f)
            print(f"✓ 成功加载翻译文件: {self.translation_file_path}")
            return True
        except FileNotFoundError:
            print(f"✗ 翻译文件不存在: {self.translation_file_path}")
            return False
        except json.JSONDecodeError as e:
            print(f"✗ 翻译文件格式错误: {e}")
            return False
    
    def extract_keys_from_dict(self, data: Dict, prefix: str = "") -> Set[str]:
        """从字典中递归提取所有键"""
        keys = set()
        for key, value in data.items():
            full_key = f"{prefix}.{key}" if prefix else key
            if isinstance(value, dict):
                keys.update(self.extract_keys_from_dict(value, full_key))
            else:
                keys.add(full_key)
        return keys
    
    def get_all_translation_keys(self) -> Set[str]:
        """获取所有翻译键"""
        return self.extract_keys_from_dict(self.translation_keys)
    
    def find_translation_usage_in_file(self, file_path: Path) -> Set[str]:
        """在单个文件中查找翻译键的使用"""
        keys = set()
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
        except (UnicodeDecodeError, FileNotFoundError):
            return keys
        
        # 匹配 t("key") 或 t('key') 或 t(`key`) 模式
        patterns = [
            r't\([\'"`]([^\'"`]+)[\'"`](?:,\s*\{[^}]*\})?\)',
            r'i18n\.t\([\'"`]([^\'"`]+)[\'"`](?:,\s*\{[^}]*\})?\)',
        ]
        
        for pattern in patterns:
            matches = re.findall(pattern, content)
            keys.update(matches)
        
        return keys
    
    def scan_all_files_for_translation_usage(self):
        """扫描所有文件查找翻译键的使用"""
        print("🔍 扫描文件中的翻译键使用...")
        
        # 支持的文件扩展名
        supported_extensions = {'.tsx', '.ts', '.jsx', '.js'}
        
        for file_path in self.webview_src_path.rglob('*'):
            if (file_path.is_file() and 
                file_path.suffix in supported_extensions and
                not file_path.parts[-1].startswith('.') and
                'node_modules' not in file_path.parts and
                'dist' not in file_path.parts):
                
                file_keys = self.find_translation_usage_in_file(file_path)
                self.used_keys.update(file_keys)
                
                if file_keys:
                    print(f"  📄 {file_path.relative_to(self.webview_src_path)}: {len(file_keys)} 个键")
    
    def check_missing_keys(self):
        """检查缺失的翻译键"""
        all_translation_keys = self.get_all_translation_keys()
        
        for used_key in self.used_keys:
            # 检查是否是嵌套键（如 "parent.child"）
            if '.' in used_key:
                parent_key = used_key.split('.')[0]
                if parent_key in all_translation_keys:
                    continue
            
            if used_key not in all_translation_keys:
                self.missing_keys.add(used_key)
    
    def check_unused_keys(self):
        """检查未使用的翻译键"""
        all_translation_keys = self.get_all_translation_keys()
        
        for translation_key in all_translation_keys:
            is_used = False
            
            # 检查精确匹配
            if translation_key in self.used_keys:
                is_used = True
            else:
                # 检查是否作为父键被使用（如 "parent" 被用作 "parent.child" 的前缀）
                for used_key in self.used_keys:
                    if used_key.startswith(translation_key + '.'):
                        is_used = True
                        break
            
            if not is_used:
                self.unused_keys.add(translation_key)
    
    def print_results(self):
        """打印检查结果"""
        print("\n" + "="*60)
        print("📊 翻译键检查结果")
        print("="*60)
        
        # 统计信息
        all_translation_keys = self.get_all_translation_keys()
        print(f"📈 统计信息:")
        print(f"  • 翻译文件中的键总数: {len(all_translation_keys)}")
        print(f"  • 代码中使用的键数量: {len(self.used_keys)}")
        print(f"  • 缺失的键数量: {len(self.missing_keys)}")
        print(f"  • 未使用的键数量: {len(self.unused_keys)}")
        
        # 缺失的键
        if self.missing_keys:
            print(f"\n❌ 缺失的翻译键 ({len(self.missing_keys)} 个):")
            for key in sorted(self.missing_keys):
                print(f"  • {key}")
        
        # 未使用的键
        if self.unused_keys:
            print(f"\n⚠️  未使用的翻译键 ({len(self.unused_keys)} 个):")
            for key in sorted(self.unused_keys):
                print(f"  • {key}")
        
        # 建议操作
        print(f"\n💡 建议:")
        if self.missing_keys:
            print(f"  • 请在翻译文件中添加缺失的键")
        if self.unused_keys:
            print(f"  • 考虑删除未使用的键以保持文件整洁")
        
        if not self.missing_keys and not self.unused_keys:
            print(f"  • ✅ 所有翻译键都完整且被使用！")
    
    def run_check(self) -> bool:
        """运行检查"""
        print("🚀 开始翻译键完整性检查...")
        
        # 加载翻译文件
        if not self.load_translation_keys():
            return False
        
        # 扫描文件使用情况
        self.scan_all_files_for_translation_usage()
        
        # 检查缺失和未使用的键
        self.check_missing_keys()
        self.check_unused_keys()
        
        # 打印结果
        self.print_results()
        
        # 返回检查结果
        return len(self.missing_keys) == 0


def main():
    """主函数"""
    parser = argparse.ArgumentParser(description='检查翻译键完整性')
    parser.add_argument(
        '--src-dir', 
        default='webview-ui/src',
        help='webview-ui/src 目录路径 (默认: webview-ui/src)'
    )
    
    args = parser.parse_args()
    
    # 检查目录是否存在
    if not os.path.exists(args.src_dir):
        print(f"❌ 目录不存在: {args.src_dir}")
        return 1
    
    # 运行检查
    checker = TranslationKeyChecker(args.src_dir)
    success = checker.run_check()
    
    return 0 if success else 1


if __name__ == "__main__":
    exit(main())