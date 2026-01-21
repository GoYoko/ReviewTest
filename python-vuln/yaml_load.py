"""
Intentionally vulnerable: unsafe YAML load that can construct arbitrary objects.
Usage: python python-vuln/yaml_load.py "!!python/object/apply:os.system ['id']"
"""

import sys

import yaml


def load_yaml(user_yaml: str):
    # Unsafe loader: allows arbitrary python object construction.
    return yaml.load(user_yaml, Loader=yaml.Loader)


if __name__ == "__main__":
    doc = sys.argv[1] if len(sys.argv) > 1 else "a: 1"
    print(load_yaml(doc))

