export const ContractErrors = {
    0: 'Contract has been already initialized', //'AlreadyInitialized',
    1: 'This account is not the owner of the subscription', //'Unauthorized',
    2: 'Subscription was not found', //'SubscriptionNotFound',
    3: 'Account has not been initialized yet', //'NotInitialized',
    4: 'Invalid amount provided', //'InvalidAmount',
    5: 'Invalid heartbeat value', //'InvalidHeartbeat',
    6: 'Invalid threshold value', //'InvalidThreshold',
    7: 'Encoded webhook value is too long', //'WebhookTooLong',
    8: 'Subscription has been suspended' //'InvalidSubscriptionStatusError'
}

/**
 * @typedef {{}} OracleSymbol - Unique asset ticker identifier
 * @property {string} source - Price feed contract address
 * @property {string} asset - Asset ticker
 */

/**
 * @typedef {bigint|string} SubscriptionId - Subscription identifier
 */

/**
 * @typedef {'active'|'suspended'} SubscriptionStatus - Current subscription status
 */

export class Subscription {
    /**
     * @internal
     */
    constructor(id, props) {
        this.id = id
        this.status = props.status === 0 ? 'active' : 'suspended'
        this.owner = props.owner
        this.base = props.base
        this.quote = props.quote
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