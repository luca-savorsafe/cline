# 翻译文件合并脚本

这个脚本用于将源语言翻译文件合并到目标语言翻译文件中，重复的部分不合并，只添加目标文件中不存在的键。

## 功能

- 深度合并两个JSON翻译文件
- 只添加目标文件中不存在的键，不覆盖现有翻译
- 递归处理嵌套字典结构
- 提供详细的统计信息和新增键列表
- 支持干运行模式（只显示将要进行的更改而不实际写入文件）

## 使用方法

### 基本用法

```bash
# 合并文件（覆盖目标文件）
python3 merge_translations_final.py <源文件> <目标文件>

# 示例：将中文翻译合并到英文翻译中
python3 merge_translations_final.py webview-ui/src/locales/zh-CN/translation.json webview-ui/src/locales/en/translation.json
```

### 指定输出文件

```bash
# 合并到新文件（不覆盖原文件）
python3 merge_translations_final.py <源文件> <目标文件> <输出文件>

# 示例
python3 merge_translations_final.py zh-CN/translation.json en/translation.json en/translation_merged.json
```

### 干运行模式

```bash
# 只显示将要进行的更改，不实际写入文件
python3 merge_translations_final.py <源文件> <目标文件> --dry-run

# 示例
python3 merge_translations_final.py zh-CN/translation.json en/translation.json --dry-run
```

## 示例

### 示例1：合并翻译文件

```bash
python3 merge_translations_final.py webview-ui/src/locales/zh-CN/translation.json webview-ui/src/locales/en/translation.json
```

输出：
```
读取源文件: webview-ui/src/locales/zh-CN/translation.json
读取目标文件: webview-ui/src/locales/en/translation.json

统计信息:
  源文件键数量: 418
  目标文件合并前键数量: 558
  合并后键数量: 716
  新增键数量: 18

新增的键路径 (18 个):
    1. account.accountInfoCard: dict
    2. chat.browserAction: dict
    3. chat.browserSession: dict
    ...（更多键）

合并完成！输出文件: webview-ui/src/locales/en/translation.json
```

### 示例2：干运行模式

```bash
python3 merge_translations_final.py zh-CN/translation.json en/translation.json --dry-run
```

## 脚本说明

### `merge_translations_final.py`

这是主要脚本，包含以下功能：

1. **深度合并算法**：递归遍历字典，只添加不存在的键
2. **统计功能**：计算键数量、新增键数量等
3. **详细报告**：显示所有新增键的路径和示例值
4. **安全选项**：支持干运行模式，避免意外覆盖

### `merge_translations.py`

这是简化版本，功能相同但输出信息较少。

## 合并规则

1. **键不存在**：如果键在目标文件中不存在，则从源文件添加
2. **键已存在**：如果键已存在，保留目标文件的值（不覆盖）
3. **嵌套字典**：如果两个值都是字典，递归合并
4. **类型不匹配**：如果源值是字典但目标值不是字典，保留目标值

## 使用场景

- 同步不同语言版本的翻译文件
- 将新功能的翻译添加到现有翻译文件中
- 检查翻译文件的完整性
- 合并多个翻译来源

## 注意事项

1. 脚本会保持目标文件的现有翻译不变
2. 只添加不存在的键，不会修改或删除现有键
3. 建议先使用`--dry-run`参数检查将要进行的更改
4. 确保文件使用UTF-8编码

## 依赖

- Python 3.6+
- 标准库：json, sys, os, argparse, typing

## 许可证

此脚本为Cline项目的一部分，遵循项目原有许可证。