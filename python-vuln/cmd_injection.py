"""
Intentionally vulnerable: command injection via shell=True.
Usage: python python-vuln/cmd_injection.py "example.com; id"
"""

import subprocess
import sys


def ping(host: str) -> str:
    cmd = f"ping -c 1 {host}"
    return subprocess.check_output(cmd, shell=True, text=True)


if __name__ == "__main__":
    host = sys.argv[1] if len(sys.argv) > 1 else "127.0.0.1"
    print(ping(host))

