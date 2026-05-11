# init-repo.ps1
#
# One-time setup script. Initializes a fresh git repo and creates the first
# commit for Coverage Compass.
#
# Review every line before running. This script:
#   1. Verifies git is installed.
#   2. Verifies the repo root looks correct.
#   3. Refuses to run if .git already exists.
#   4. Shows you exactly what would be committed before committing.
#   5. Pauses for confirmation before any change.
#   6. Does NOT push to any remote.
#   7. Does NOT create a GitHub repo.
#
# Run from PowerShell:
#     ./scripts/init-repo.ps1
#
# If PowerShell refuses to run the script due to execution policy, use:
#     powershell -ExecutionPolicy Bypass -File ./scripts/init-repo.ps1

$ErrorActionPreference = 'Stop'

function Confirm-Step {
    param([string]$Prompt)
    $response = Read-Host "$Prompt (type 'yes' to continue)"
    if ($response -ne 'yes') {
        Write-Host "Aborted."
        exit 0
    }
}

# --- 1. Find and validate repo root ---

$repoRoot = (Resolve-Path "$PSScriptRoot\..").Path
Set-Location $repoRoot

Write-Host "Repo root: $repoRoot"
Write-Host ""

$expectedMarkers = @('README.md', 'LICENSE', 'docs', 'web', 'rules')
foreach ($marker in $expectedMarkers) {
    if (-not (Test-Path (Join-Path $repoRoot $marker))) {
        Write-Error "Expected file or directory not found: $marker. Are you running from the right place?"
        exit 1
    }
}

# --- 2. Verify git is installed ---

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Error "git is not installed or not on PATH. Install Git for Windows from https://git-scm.com/download/win first."
    exit 1
}

# --- 3. Refuse if already a repo ---

if (Test-Path (Join-Path $repoRoot ".git")) {
    Write-Error "A .git directory already exists. This script is for a one-time init, not a re-init. Aborting."
    exit 1
}

# --- 4. Check git identity is set ---

$gitEmail = ""
$gitName = ""
try { $gitEmail = (git config --global user.email).Trim() } catch {}
try { $gitName  = (git config --global user.name).Trim()  } catch {}

if (-not $gitEmail -or -not $gitName) {
    Write-Warning "git user.email or user.name is not set globally."
    Write-Host "Set them first with:"
    Write-Host '    git config --global user.email "you@example.com"'
    Write-Host '    git config --global user.name "Your Name"'
    Write-Host ""
    Write-Host "These will appear in every commit you make on this machine, forever."
    Write-Host ""
    Confirm-Step "Proceed without setting them?"
} else {
    Write-Host "Committing as: $gitName <$gitEmail>"
    Write-Host ""
}

# --- 5. git init on main ---

Write-Host "Running: git init --initial-branch=main"
git init --initial-branch=main | Out-Host

# --- 6. Preview what would be committed (dry-run) ---

Write-Host ""
Write-Host "Files that WILL be staged (dry-run preview):"
Write-Host "============================================="
git add --dry-run . 2>&1 | Out-Host

Write-Host ""
Write-Host "Files that .gitignore is excluding:"
Write-Host "===================================="
git status --ignored --short 2>&1 | Where-Object { $_ -match '^\!\!' } | Out-Host

Write-Host ""
Write-Host "PII / secrets check before continuing:"
Write-Host "  - Any files with names, addresses, SSNs, or case numbers?"
Write-Host "  - Any .env, credentials, or API key files?"
Write-Host "  - Anything from research/ (should be ignored)?"
Write-Host "  - Anything you have not authored or do not have the right to share?"
Write-Host ""

Confirm-Step "Stage all non-ignored files and create the initial commit?"

# --- 7. Stage and commit ---

git add . | Out-Host

$commitMessage = @'
Initial commit: Coverage Compass scaffold

Privacy-local web app to help disabled Coloradans navigate Colorado
Medicaid's work-reporting requirements (rolling out August 2026 to
January 2027). Built in partnership with the Colorado Cross-Disability
Coalition (CCDC).

Two flows from one engine:
- Before things go wrong: assemble an exemption packet from documents
  the member already has (SSA award letter, waiver enrollment, tax
  returns).
- After things go wrong: draft an appeal letter, routed to a CCDC
  advocate for review.

Scaffold includes:
- Documentation: brainstorm, spec v0.1, roadmap, architecture, privacy
  threat model, accessibility standard, glossary, CO rules reference,
  outreach plan, one-page pitch and email draft.
- Web app shell: Vite + React + TypeScript (strict), React Aria
  Components, plain CSS. PDF, OCR, and rules engine modules are typed
  stubs ready to wire up.
- Rule library: YAML schema seeded with six Colorado letter types and
  eight exemption categories. All deadlines marked "verify with CCDC".
- Project metadata: LICENSE (Apache 2.0), CODE_OF_CONDUCT, SECURITY,
  CONTRIBUTING, GitHub issue and pull request templates.

Status: pre-release scaffold. Not for production use. All facts in
rules/co/ require verification by a CCDC advocate or attorney before
shipping to users.
'@

git commit -m $commitMessage | Out-Host

Write-Host ""
Write-Host "Done. Initial commit created."
Write-Host ""
Write-Host "To review the commit:"
Write-Host "    git log -1 --stat"
Write-Host ""
Write-Host "Next steps (not done by this script):"
Write-Host "  1. Create an empty GitHub repo. Suggested name: ccdc-medicaid-tool."
Write-Host "       Do NOT initialize it with README, LICENSE, or .gitignore."
Write-Host "  2. Add the remote:"
Write-Host "       git remote add origin git@github.com:<your-user>/ccdc-medicaid-tool.git"
Write-Host "  3. Push:"
Write-Host "       git push -u origin main"
Write-Host ""
Write-Host "Before pushing, decide:"
Write-Host "  - Public or private at first?"
Write-Host "  - Branch protection on main (require PRs even for solo work)?"
Write-Host "  - Repo description, topics, and link to CCDC."
