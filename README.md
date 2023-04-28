
# Fetcch Resolve Names

Resolve various DIDs like `.eth`, `.sol`, `.arb`, `.bnb`, `.apt`, `@kana` and many more using a single SDK



## Installation

Install `@fetcch/resolve-names` with package manager

```bash
  NPM
  npm install @fetcch/resolve-names
  
  YARN
  yarn add @fetcch/resolve-names

  PNPM
  pnpm i @fetcch/resolve-names
```
## Usage

### Resolve Name

```typescript
import { Resolve } from "@fetcch/resolve-names"

const resolver = new Resolve({
  eth: "ETHEREUM_RPC_URL",
  pol: "POLYGON_RPC_URL",
  ...
  sol: "SOLANA_RPC_URL"
})

const id = await resolver.resolve("satyam@kana")

// OR

const id = await resolver.resolve("satyam.eth")
```
## License

[MIT](https://choosealicense.com/licenses/mit/)

## Links

- [Fetcch](https://fetcch.xyz)
- [Docs](https://docs.fetcch.xyz)