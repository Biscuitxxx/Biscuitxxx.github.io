# Deploy script for Mizuki - builds dist and pushes to GitHub Pages 'pages' branch.
# Portable: place inside <project>/scripts and run after `pnpm build`.
$ErrorActionPreference = "Continue"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$root      = Split-Path -Parent $scriptDir
$dist      = Join-Path $root "dist"
$tmp       = Join-Path (Split-Path $root -Parent) "mizuki-pages"
$log       = Join-Path $root "deploy_pages.log"
$repo      = (git -C $root remote get-url origin).Trim()

if (-not $repo) { Write-Output "ERROR: no git remote 'origin' found"; exit 1 }
if (-not (Test-Path $dist)) { Write-Output "ERROR: dist not found, run pnpm build first"; exit 1 }

Add-Content $log ("[{0}] ===== start pages deploy =====" -f (Get-Date -Format s))

# 1. clean + copy dist
if (Test-Path $tmp) { Remove-Item $tmp -Recurse -Force }
New-Item -ItemType Directory -Path $tmp | Out-Null
Copy-Item "$dist\*" $tmp -Recurse -Force
Add-Content $log ("[{0}] copied dist ({1} files)" -f (Get-Date -Format s), (Get-ChildItem $tmp -Recurse -File).Count)

# fallback: ensure .nojekyll exists (else GitHub Pages Jekyll ignores _astro -> resources 404)
if (-not (Test-Path "$tmp\.nojekyll")) {
    [IO.File]::WriteAllText("$tmp\.nojekyll", "", (New-Object System.Text.UTF8Encoding $false))
    Add-Content $log ("[{0}] added .nojekyll fallback" -f (Get-Date -Format s))
}

Set-Location $tmp
if (-not (Test-Path "$tmp\.git")) { git init | Out-Null }
git config user.name "Biscuitxxx"
git config user.email "Biscuitxxx@users.noreply.github.com"
git remote remove origin 2>$null
git remote add origin $repo
git rm -rf --cached . 2>$null
git add -A
git commit -m "Deploy Mizuki static site" 2>&1 | Out-Null

# 2. push to pages branch with retry
$env:GIT_TERMINAL_PROMPT = "0"
$ok = $false
foreach ($i in 1..12) {
    Add-Content $log ("[{0}] push pages attempt {1}" -f (Get-Date -Format s), $i)
    git push -f origin HEAD:pages 1>> $log 2>&1
    if ($LASTEXITCODE -eq 0) { $ok = $true; Add-Content $log ("[{0}] PAGES_PUSH_SUCCESS attempt {1}" -f (Get-Date -Format s), $i); break }
    Start-Sleep -Seconds 12
}

if ($ok) { Add-Content $log ("[{0}] PAGES_DEPLOYED OK" -f (Get-Date -Format s)); Write-Output "PAGES_DEPLOYED" }
else { Add-Content $log ("[{0}] PAGES_PUSH_FAILED" -f (Get-Date -Format s)); Write-Output "PAGES_PUSH_FAILED" }
