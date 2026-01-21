type DbRow = Record<string, unknown>;

// Extremely fake DB client. It exists purely to create realistic call stacks for review/LSP tests.
const fakeUsers: DbRow[] = [
  { id: "1", displayName: "alice", email: "alice@example.com", role: "admin" },
  { id: "2", displayName: "bob", email: "bob@example.com", role: "user" },
];

export async function dbQuery<T extends DbRow>(sql: string): Promise<T[]> {
  // "Query parser" is intentionally naive.
  const like = sql.match(/LIKE '%(.*)%'/i)?.[1] ?? "";
  const id = sql.match(/WHERE id = '(.*)'/i)?.[1] ?? "";

  if (id) return fakeUsers.filter((u) => String(u.id) === id) as T[];
  return fakeUsers.filter((u) => String(u.displayName).includes(like)) as T[];
}

