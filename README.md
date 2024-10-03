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
    tx.sign(Keypair.fromSecret('SC7L...8LOI')) //sign it
    return tx.toEnvelope().toXDR('base64') //return signed transaction
    //alternatively, you can call wallet here to sign the transaction
}

//create a new instance of the client
const sc = new SubscriptionClient({
    publicKey: 'GAD4...F06D',  //address of the account that will own subscriptions
    signTransaction: sign, //tx signing callback
    rpcUrl: 'https://rpc.url/' //RPC URL
})

//create new subscription
const created = await sc.createSubscription({
    webhook: 'https://your.site/endpoint-that-will-receive-notifications',
    base: {asset: 'AQUA:GBNZILSTVQZ4R7IKQDGHYGY2QXL5QOFJYQMXPKWRRM5PAV7Y4M67AQUA', source: 'pubnet'}, //base symbol
    quote: {asset: 'SOL', source: 'exchanges'}, //quote symbol
    threshold: 3,  //trigger subscription if the price changed more than 0.3%
    heartbeat: 20, //send updates to the server once every 20 minutes regardless of the price changes
    initialBalance: '300' //deposit 300 tokens
})
console.log(created)
const subscriptionId = created.id

//retrieve subscription from the ledger
const fetched = await sc.getSubscription(subscriptionId)
console.log(fetched) //sholuld be identical to the previosuly created subscription

//estimate daily retention fee
console.log(await sc.getRetentionFee(subscriptionId))

//deposit additional tokens to the subscription balance
await sc.deposit(subscriptionId, '100')

//cancel the subscription and get back the remaining deposit balance
await sc.cancel(subscriptionId)
```

### Notifications format

Once a subscription trigger conditions met, reflector nodes will send notifications to the address specified in the
`webhookUrl` via HTTP POST request in JSON format. Each node signs and transmits the data independently,
so the endpoint will receive several similar notifications with identical event descriptor, but different signatures.

Example of the POST notification received by the webhook endpoint:

```json
{
  "update": {
    "contract": "CBNGTWIVRCD4FOJ24FGAKI6I5SDAXI7A4GWKSQS7E6UYSR4E4OHRI2JX",
    "events": [
      "B873JM7PV3/z+vZ4+qlCuiRI5WiSyJExLD9GcKUmtks=",
      "Wkc9HnBcMAGxrcAi2nqhst69F/vO31IhmVO7j41UyFU=",
      "ivg5kPjWFOt8Rwm1dT9VHc6FH00DI6zVbgGlgeao8fk="
    ],
    "event": {
      "subscription": "16",
      "base": {
        "source": "pubnet",
        "asset": "AQUA:GBNZILSTVQZ4R7IKQDGHYGY2QXL5QOFJYQMXPKWRRM5PAV7Y4M67AQUA"
      },
      "quote": {
        "source": "exchanges",
        "asset": "SOL"
      },
      "decimals": 14,
      "price": "21749494669965161500",
      "prevPrice": "21688544256328711209",
      "timestamp": 1725578340000
    },
    "root": "O1hOLCVWIxaPWMvyfBvh+MOYh0TTMb8ekj8E1Ao4PfQ="
  },
  "signature": "FLS6e1auSAdPjDTlb/EKfrv2KvZ1juMRX4zaXCNQWyyjciN4h3kV5hkbfEdjVYTKZmOHaXBod+QFjZPIBEEuCA==",
  "verifier": "GCQTHGZAYIJB3SEMFJZABA7V7QIAJVRD72GHQAYNHHRBIMOMUXMWBPG3"
}
```