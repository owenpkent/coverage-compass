# scripts

Operational scripts for one-time or recurring repo tasks. Each script lists
what it does at the top. Review before running.

## init-repo.ps1

One-time. Initializes the git repository and creates the first commit.

- Requires Git for Windows.
- Refuses to run if a `.git` directory already exists.
- Shows what would be committed (dry run) before committing.
- Pauses for explicit confirmation before any change.
- Does not push to any remote, does not create a GitHub repo.

Run:

```powershell
./scripts/init-repo.ps1
```

If PowerShell refuses to run due to execution policy:

```powershell
powershell -ExecutionPolicy Bypass -File ./scripts/init-repo.ps1
```
