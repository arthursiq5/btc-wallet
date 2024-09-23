const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

// define network
const network = bitcoin.networks.testnet

const path = `m/49'/1'/0'/0`
const mnemonic = bip39.generateMnemonic()

// create wallet root
const seed = bip39.mnemonicToSeedSync(mnemonic)

let root = bip32.fromSeed(seed, network)

// create account - public and private keys
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network
}).address

console.log('carteira gerada');
console.log(`Endereço: ${btcAddress}`);
console.log(`Chave privada: ${node.toWIF()}`);
console.log(`Seed: ${mnemonic}`);
