---
name: Bug Report
about: Create a report to help us improve
title: '[BUG] '
labels: bug
assignees: ''

---

## Description

A clear and concise description of the bug.

## Steps to Reproduce

1. Install `ts-serializable` version X.X.X
2. Create a class with decorators
3. Try to serialize/deserialize
4. See error

## Expected Behavior

What you expected to happen.

## Actual Behavior

What actually happened.

## Code Sample

```typescript
// Minimal code example that demonstrates the issue
import { jsonProperty, Serializable } from "ts-serializable";

class YourClass extends Serializable {
    @jsonProperty(String)
    public name: string = '';
}
```

## Environment

- **ts-serializable version**: [e.g., 4.2.2]
- **Node.js version**: [e.g., 20.10.0]
- **npm/pnpm version**: [e.g., npm 10.2.3]
- **Operating System**: [e.g., Windows 11, macOS 14, Ubuntu 22.04]
- **TypeScript version**: [e.g., 5.3.3]

## Additional Context

Add any other context, screenshots, or error messages here.

## Possible Solution

If you have ideas on how to fix this, please share them.
