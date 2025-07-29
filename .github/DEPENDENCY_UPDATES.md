# Automated Dependency Updates

This project uses automated dependency updates to keep npm packages current and secure.

## Configuration

### Dependabot
- **Schedule**: Monthly updates on the first Monday of each month at 9:00 AM UTC
- **Scope**: All npm dependencies in package.json
- **Grouping**: Minor and patch updates are grouped together
- **Security**: Immediate security updates override the monthly schedule
- **Limits**: Maximum 5 open dependency PRs at once

### GitHub Actions Workflow
- **Trigger**: Monthly schedule (first Monday) + manual dispatch
- **Actions**: 
  - Check for outdated packages
  - Run security audit
  - Update package-lock.json
  - Create PR with updates

## How It Works

1. **Dependabot** monitors dependencies and creates PRs for:
   - Monthly scheduled updates
   - Immediate security fixes
   - Grouped minor/patch updates

2. **GitHub Actions** provides additional automation:
   - Comprehensive package analysis
   - Automated package-lock.json updates
   - Build verification
   - Formatted PR creation

## Manual Triggers

You can manually trigger dependency updates:

1. **Dependabot**: Go to repository → Insights → Dependency graph → Dependabot
2. **GitHub Actions**: Go to Actions → Monthly Dependency Updates → Run workflow

## Review Process

When dependency update PRs are created:

1. Review the changes in package.json and package-lock.json
2. Check for breaking changes in updated packages
3. Verify build and tests pass
4. Merge when satisfied with the updates

## Benefits

- ✅ **Security**: Automatic security updates
- ✅ **Maintenance**: Regular monthly updates prevent dependency drift
- ✅ **Automation**: Minimal manual intervention required
- ✅ **Visibility**: Clear PR descriptions and change tracking
- ✅ **Control**: Configurable limits and grouping