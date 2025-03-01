import os
from pathlib import Path

def generate_directory_tree(start_path: str, output_file: str, ignore_patterns: set[str]) -> None:
    """
    生成目录树并写入文件
    
    Args:
        start_path: 起始目录路径
        output_file: 输出文件名
        ignore_patterns: 要忽略的文件/文件夹模式
    """
    
    def should_ignore(path: str) -> bool:
        """检查是否应该忽略该路径"""
        return any(pattern in path for pattern in ignore_patterns)
    
    def get_tree(dir_path: Path, prefix: str = '') -> list[str]:
        """递归生成目录树"""
        if should_ignore(str(dir_path)):
            return []
        
        contents = list(dir_path.iterdir())
        # 文件夹优先，同类型按字母排序
        contents.sort(key=lambda x: (not x.is_dir(), x.name.lower()))
        
        tree_lines = []
        for i, path in enumerate(contents):
            is_last = i == len(contents) - 1
            current_prefix = '└── ' if is_last else '├── '
            next_prefix = '    ' if is_last else '│   '
            
            if should_ignore(str(path)):
                continue
                
            tree_lines.append(f"{prefix}{current_prefix}{path.name}")
            
            if path.is_dir():
                # 添加目录描述注释
                comment = get_directory_comment(path.name)
                if comment:
                    tree_lines[-1] += f"{' ' * max(1, 25 - len(path.name))}# {comment}"
                    
                tree_lines.extend(get_tree(path, prefix + next_prefix))
                
        return tree_lines

    def get_directory_comment(dir_name: str) -> str:
        """返回目录的描述注释"""
        comments = {
            'app': 'Next.js 应用主目录',
            'api': 'API 路由',
            'components': '可复用组件',
            'public': '静态资源',
            'utils': '工具函数',
            'hooks': '自定义Hooks',
            'types': '类型定义',
        }
        return comments.get(dir_name, '')

    # 获取项目根目录名
    root_name = os.path.basename(os.path.abspath(start_path))
    
    # 生成目录树
    tree = [f"{root_name}/"]
    tree.extend(get_tree(Path(start_path)))
    
    # 写入文件
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('```markdown:README.md\n')
        f.write('\n'.join(tree))
        f.write('\n```\n')

if __name__ == '__main__':
    # 定义要忽略的文件和目录
    ignore_patterns = {
        '.git',
        '__pycache__',
        'node_modules',
        '.next',
        '.vscode',
        'venv',
        '.env',
        '.DS_Store'
    }
    
    # 生成目录树
    generate_directory_tree('.', 'Tree.md', ignore_patterns)
    print('目录树已生成到 Tree.md 文件中')