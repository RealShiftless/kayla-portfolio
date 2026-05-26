#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -lt 1 ]; then
  echo "Usage: npm run publish:site -- \"Commit message\""
  echo
  echo "Optional environment variables:"
  echo "  GITHUB_OWNER=RealShiftless"
  echo "  PAGES_REPO=RealShiftless/realshiftless.github.io"
  echo "  PAGES_BRANCH=main"
  echo "  DEPLOY_DIR=.deploy/realshiftless.github.io"
  exit 2
fi

for command in gh git npm; do
  if ! command -v "$command" >/dev/null 2>&1; then
    echo "Missing required command: $command" >&2
    exit 1
  fi
done

commit_message="$*"
root_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
deploy_dir="${DEPLOY_DIR:-$root_dir/.deploy/realshiftless.github.io}"
owner="${GITHUB_OWNER:-$(gh api user --jq .login)}"
pages_repo="${PAGES_REPO:-$owner/$owner.github.io}"
pages_branch="${PAGES_BRANCH:-main}"

cd "$root_dir"
npm run build

mkdir -p "$(dirname "$deploy_dir")"

if [ ! -d "$deploy_dir/.git" ]; then
  rm -rf "$deploy_dir"
  gh repo clone "$pages_repo" "$deploy_dir"
fi

cd "$deploy_dir"
git fetch origin "$pages_branch"

if git show-ref --verify --quiet "refs/heads/$pages_branch"; then
  git checkout "$pages_branch"
else
  git checkout -B "$pages_branch" "origin/$pages_branch"
fi

git pull --ff-only origin "$pages_branch"

find "$deploy_dir" -mindepth 1 -maxdepth 1 ! -name ".git" -exec rm -rf {} +
cp -a "$root_dir/root/." "$deploy_dir/"

git add -A

if git diff --cached --quiet; then
  echo "No published-site changes to commit."
  echo "Site repo: $pages_repo"
  echo "Deploy dir: $deploy_dir"
  exit 0
fi

git commit -m "$commit_message"
git push origin "$pages_branch"

echo
echo "Published to:"
echo "https://$owner.github.io"
