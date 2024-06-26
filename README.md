# Integração das ferramentas:
### Foundry e Hardhat para desenvolvimento de Smart Contracts em Solidity

## Hardhat e Foundry
### Executar todos os testes do Hardhat e Foundry
```shell
$ npm test
```

## Hardhat
**Flexible. Extensible. Fast. Ethereum development environment for professionals**

## Hardhat usage

### Compile
```shell
$ npx hardhat compile
```
### Test
```shell
$ npx hardhat test
```
### Test Coverage
```shell
$ npx hardhat coverage
```
### Deploy
```shell
$ npx hardhat ignition deploy ./ignition/modules/DeployPriceFeed.ts --network localhost
```
---

## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

-   **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
-   **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
-   **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
-   **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Foundry Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/DeployPriceFeed.s.sol:DeployPriceFeed --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```

---

### Libs em uso: 
* @api3/contracts           - https://dapi-docs.api3.org/
* @openzeppelin/contracts   - https://docs.openzeppelin.com/