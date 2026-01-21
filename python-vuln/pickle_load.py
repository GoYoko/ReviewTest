"""
Intentionally vulnerable: arbitrary code execution via pickle deserialization.
Usage: python python-vuln/pickle_load.py "<base64_pickle>"
"""

import base64
import pickle
import sys


def load_from_user(b64: str):
    raw = base64.b64decode(b64.encode("utf-8"))
    return pickle.loads(raw)


if __name__ == "__main__":
    b64 = sys.argv[1] if len(sys.argv) > 1 else ""
    obj = load_from_user(b64)
    print(repr(obj))

