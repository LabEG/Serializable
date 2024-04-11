# Generate big nested class

## Quick start

1. Install Nix in single-user mode ([link](https://nixos.wiki/wiki/Nix_Installation_Guide)) and permanently enable flakes ([link](https://nixos.wiki/wiki/Flakes)).

1. Run tests. Running them first time may take a long time due to downloading and building stuff.

   ```console
   npm run test-nested
   ```

## Configs

- [package.yaml] - used by `hpack` to generate a `.cabal`
- [.envrc](./.envrc) - for [direnv](https://github.com/direnv/direnv)
- [fourmolu.yaml](./fourmolu.yaml) - for [fourmolu](https://github.com/fourmolu/fourmolu#configuration)
