import {StrKey} from '@stellar/stellar-sdk'

export const ContractErrors = {
    0: 'AlreadyInitialized',
    1: 'Unauthorized',
    2: 'SubscriptionNotFound',
    3: 'NotInitialized',
    4: 'InvalidAmount',
    5: 'InvalidHeartbeat',
    6: 'InvalidThreshold',
    7: 'WebhookTooLong',
    8: 'InvalidSubscriptionStatusError'
}

/**
 * @typedef {{}} OracleSymbol
 * @property {string} source - Price feed contract address
 * @property {string} symbol - Token symbol
 */

/**
 * @typedef {bigint|string} SubscriptionId
 */

/**
 * @typedef {'active'|'suspended'} SubscriptionStatus
 */

export class Subscription {
    /**
     * @internal
     */
    constructor(id, props) {
        this.id = id
        this.status = props.status === 0 ? 'active' : 'suspended'
        this.owner = props.owner
        this.base = decodeOracleSymbol(props.base)
        this.quote = decodeOracleSymbol(props.quote)
        this.threshold = props.threshold
        this.heartbeat = props.heartbeat
        this.balance = props.balance
        this.updated = new Date(Number(props.updated))
    }

    /**
     * Unique subscription ID
     * @type {bigint}
     * @readonly
     */
    id
    /**
     * Current activity status
     * @type {SubscriptionStatus}
     * @readonly
     */
    status
    /**
     * Address of account that owns this subscription
     * @type {string}
     * @readonly
     */
    owner
    /**
     * Base symbol
     * @type {OracleSymbol}
     * @readonly
     */
    base
    /**
     * Quote symbol
     * @type {OracleSymbol}
     * @readonly
     */
    quote
    /**
     * Price movement threshold that triggers subscription, in ‰
     * @type {number}
     * @readonly
     */
    threshold
    /**
     * Interval of periodic invocations, in minutes
     * @type {number}
     * @readonly
     */
    heartbeat
    /**
     * Webhook URL where trigger notifications get POSTed
     * @type {string}
     * @readonly
     */
    webhook = '[encrypted]'
    /**
     * Current outstanding subscription balance
     * @type {bigint}
     * @readonly
     */
    balance
    /**
     * Last updated timestamp
     * @type {Date}
     * @readonly
     */
    updated
}

/**
 * @param {OracleSymbol} os
 * @internal
 */
export function formatOracleSymbol(os) {
    //resolve symbol type
    const symbolType = StrKey.isValidContract(os.symbol) ? 'Stellar' : 'Other'
    const symbol = os.symbol
    return {
        asset: {
            tag: symbolType,
            values: [symbol]
        },
        source: os.source
    }
}

function decodeOracleSymbol(os) {
    let symbol = os.asset.values[0]
    if (os.asset.tag === 'Stellar') {
        symbol = StrKey.encodeContract(symbol)
    }
    return {
        source: os.source,
        symbol
    }
}