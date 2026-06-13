# Utilities vs. Libs

This directory contains pure utility functions, formatters, and validators that are independent of external libraries or frameworks.

## Distinction:

- `src/lib/`: Custom configurations or wrappers around external libraries (e.g., dynamic style mixers like `cn`, third-party client hooks, or direct library instances).
- `src/utils/`: Lightweight, stateless, pure TypeScript/JavaScript helper functions (e.g., date formatting, string manipulation, value math calculations) that have zero external dependencies.
