# @reflector/subscription-client

> Client for Reflector Subscriptions service

## Installation

```shell
npm i @reflector/subscription-client
```

## Usage

```js
import SubscriptionClient from '@reflector/subscription-client'
import {Keypair, Networks, TransactionBuilder} from '@stellar/stellar-sdk'

//callback for signing generated trasnactions
function sign(xdr, opts) {
    const tx = TransactionBuilder.fromXDR(xdr, opts.networkPassphrase) //parse a transaction from raw XDR
    tx.sign(Keypair.fromSecret('SC...OI')) //sign it
    return tx.toEnvelope().toXDR('base64') //return signed transaction
    //alternatively, you can call wallet here to sign the transaction
}

//create a new instance of the client
const sc = new SubscriptionClient({
    publicKey: 'GA...6D',  //address of the account that will own subscriptions
    signTransaction: sign, //tx signing callback
    rpcUrl: 'https://soroban-testnet.stellar.org/' //RPC URL
})

//create new subscription
const created = await sc.createSubscription({
    webhook: 'https://your.site/endpoint-that-will-receive-notifications',
    base: {symbol: 'USD', source: 'CAB5NCTKZEET4NFI35VEQBO4N52C74HUHLZYMTQAOW7W3VOZM6XV2NU4'}, //base symbol
    quote: {symbol: 'BTC', source: 'CAB5NCTKZEET4NFI35VEQBO4N52C74HUHLZYMTQAOW7W3VOZM6XV2NU4'}, //quote symbol
    threshold: 3,  //trigger subscription if the price changed more than 0.3%
    heartbeat: 20, //send updates to the server once every 20 minutes regardless of the price changes
    initialBalance: '300' //deposit 300 tokens
})
console.log(created)

//retrieve subscription from the ledger
const fetched = await sc.getSubscription(created.id)
console.log(fetched) //will be identical to the previosuly created subscription

//deposit additional tokens to the subscription balance
await sc.deposit(created.id, '100')

//cancel the subscription and get back the rmaining deposit balance
await sc.cancel(created.id)
```

### Notifications format

Once a subscription trigger conditions met, reflector nodes will send notifications to the address specified in the
`webhookUrl` via HTTP POST request in JSON format. Each node signs and transmits the data independently,
so the endpoint will receive several similar notifications with identical event descriptor, but different signatures.

Example of the POST notification received by the webhook endpoint:

```json
{
  "update": {
    "contract": "CCPYWKODBPDCHCYJTQ3S5OSLXB6LAXQWN6FEOYUYMWXCX2ESYLHPAYMW",
    "events": [
      "ryA05D06CloUpBAQ0svM7lmk4FJvqJD/PIpO02BMRKc="
    ],
    "event": {
      "subscription": "595",
      "base": {
        "source": "CC4RBGIT7TGCGSZXO3BV2LD3IWHPVA5ER5HUVHKC2CDAV7GHXRRXGSUV",
        "asset": "CA2E53VHFZ6YSWQIEIPBXJQGT6VW3VKWWZO555XKRQXYJ63GEBJJGHY7"
      },
      "quote": {
        "source": "CC4RBGIT7TGCGSZXO3BV2LD3IWHPVA5ER5HUVHKC2CDAV7GHXRRXGSUV",
        "asset": "CDJF2JQINO7WRFXB2AAHLONFDPPI4M3W2UM5THGQQ7JMJDIEJYC4CMPG"
      },
      "decimals": 14,
      "price": "76000159215",
      "prevPrice": "76457567715",
      "timestamp": 1721871780000
    },
    "root": "F7F29BCMKes8JBox8MUkwZBtDa5jx+SkpnTkZDkV9ss="
  },
  "signature": "j74r4hipZFiAXhz6JOXdIMverJWMkKGFKXTO8AZ/RaABgU8/wBdSUEIeLCh3BhhlT+a2Okxcb3UksrzDC+71Ag==",
  "verifier": "GBE2YEDQJUD3LL5CXKUTOHD5FXHRWLPGLIKAOAUQ7LURPCA77RSMLIAV"
}
```