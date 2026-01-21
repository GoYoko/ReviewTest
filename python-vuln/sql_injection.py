"""
Intentionally vulnerable: SQL injection via string concatenation.
Usage: python python-vuln/sql_injection.py "alice' OR 1=1 --"
"""

import sqlite3
import sys


def setup(conn: sqlite3.Connection) -> None:
    conn.executescript(
        """
        CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY, name TEXT, role TEXT);
        DELETE FROM users;
        INSERT INTO users(name, role) VALUES ('alice', 'admin'), ('bob', 'user');
        """
    )


def find_user(conn: sqlite3.Connection, name: str):
    # SQL injection: user input concatenated into SQL.
    sql = f"SELECT id, name, role FROM users WHERE name = '{name}'"
    return list(conn.execute(sql))


if __name__ == "__main__":
    q = sys.argv[1] if len(sys.argv) > 1 else "alice"
    conn = sqlite3.connect(":memory:")
    setup(conn)
    print(find_user(conn, q))

