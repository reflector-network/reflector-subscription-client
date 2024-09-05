import {Networks} from '@stellar/stellar-sdk'
import {Subscription} from './types.js'
import ContractClient from './contract-client.js'
import validation from './validation.js'
import {encryptWebhookUrl} from './webhook.js'
import {processSimulationErrors} from './error-resolver.js'

/**
 * Client for interaction with Reflector Subscriptions service
 */
export default class SubscriptionClient {
    /**
     * @param {ClientInitializationParams} params
     */
    constructor(params) {
        const options = {
            publicKey: params.publicKey,
            signTransaction: params.signTransaction,
            rpcUrl: params.rpcUrl,
            networkPassphrase: Networks.TESTNET,
            contractId: params.contractId || 'CDQ7EZ2GG6LI6VKKY3UKDT4QGMNEJZGT2ANR7QCB65XVIXZTQ2CHBXU4'
        }
        this.client = new ContractClient(options)
    }

    /**
     * @type {ContractClient}
     * @private
     */
    client

    /**
     * Get subscription by ID
     * @param {SubscriptionId} subscriptionId
     * @return {Promise<Subscription>}
     */
    async getSubscription(subscriptionId) {
        subscriptionId = validation.validateBigint(subscriptionId, 'subscriptionId')
        const res = await this.client.get_subscription({subscription_id: subscriptionId})
        processSimulationErrors(res)
        return new Subscription(subscriptionId, res.result)
    }

    /**
     * Create Reflector subscription with given parameters
     * @param {SubscriptionInitParams} params - Initialization parameters
     * @return {Promise<Subscription>}
     */
    async createSubscription(params) {
        let {owner = this.client.options.publicKey, base, quote, threshold, heartbeat, webhook, initialBalance} = params
        //validate input
        validation.validateAccount(owner, 'owner')
        validation.validateOracleSymbol(base, 'base')
        validation.validateOracleSymbol(quote, 'quote')
        threshold = validation.validateThreshold(threshold)
        heartbeat = validation.validateHeartbeat(heartbeat)
        validation.validateWebhook(webhook)
        initialBalance = validation.validateBalance(initialBalance, 'initialBalance')
        //encrypt webhook
        const encryptedWebhook = await encryptWebhookUrl(webhook)
        //build transaction
        const tx = await this.client.create_subscription({
            new_subscription: {
                owner,
                base,
                quote,
                heartbeat,
                threshold,
                webhook: encryptedWebhook
            },
            amount: initialBalance
        })
        processSimulationErrors(tx)
        const res = await tx.signAndSend()
        return new Subscription(res.result[0], res.result[1])
    }

    /**
     * Deposit Reflector tokens to subscription balance
     * @param {SubscriptionId} subscriptionId - Subscription ID to top up
     * @param {string|bigint} amountToDeposit - Amount of tokens to deposit
     * @param {string} from - Account to transfer tokens from
     * @return {Promise}
     */
    async deposit(subscriptionId, amountToDeposit, from) {
        subscriptionId = validation.validateBigint(subscriptionId, 'subscriptionId')
        amountToDeposit = validation.validateBigint(amountToDeposit, 'amountToDeposit')
        validation.validateAccount(from, 'from')
        const tx = await this.client.deposit({
            subscription_id: subscriptionId,
            amount: amountToDeposit,
            from
        })
        processSimulationErrors(tx)
        const res = await tx.signAndSend()
    }

    /**
     * Cancel active subscription and reimburse the balance to subscription owner account
     * @param {SubscriptionId} subscriptionId
     * @return {Promise}
     */
    async cancel(subscriptionId) {
        subscriptionId = validation.validateBigint(subscriptionId, 'subscriptionId')
        const tx = await this.client.cancel({subscription_id: subscriptionId})
        processSimulationErrors(tx)
        const res = await tx.signAndSend()
    }

    /**
     * Calculate daily subscription retention fee
     * @param {SubscriptionId} subscriptionId
     * @return {Promise<bigint>}
     */
    async getRetentionFee(subscriptionId) {
        subscriptionId = validation.validateBigint(subscriptionId, 'subscriptionId')
        const res = await this.client.get_retention_fee({subscription_id: subscriptionId})
        processSimulationErrors(res)
        return res.result
    }

    /**
     * Retrieve Reflector token contract address
     * @return {Promise<string>}
     */
    async getToken() {
        const tx = await this.client.token()
        processSimulationErrors(tx)
        return tx.result
    }

    /**
     * Get contract version
     * @return {Promise<number>}
     */
    async getVersion() {
        const tx = await this.client.version()
        processSimulationErrors(tx)
        return tx.result
    }

    /**
     * Get base contract fee (used to calculate amounts charged from the account balance on the daily basis)
     * @return {Promise<number>}
     */
    async getFee() {
        const tx = await this.client.fee()
        processSimulationErrors(tx)
        return tx.result
    }

    /**
     * Retrieve Reflector token contract address
     * @return {Promise<bigint>}
     */
    async getLastId() {
        const tx = await this.client.last_id()
        processSimulationErrors(tx)
        return tx.result
    }
}

/**
 * @typedef {{}} ClientInitializationParams
 * @property {string} publicKey - Public key of the account that will interact with the contract
 * @property {SignTransactionCallback} signTransaction - Callback for signing transactions generated by the client
 * @property {string} rpcUrl - URL of the RPC server
 */

/**
 * @typedef {Object} SubscriptionInitParams
 * @property {string} [owner] - Address of account that will own this subscription (by default equals to publicKey from initialization parameters)
 * @property {OracleSymbol} base - Base symbol
 * @property {OracleSymbol} quote - Quote symbol
 * @property {number} threshold - Price movement threshold that triggers subscription, in ‰
 * @property {number} heartbeat - Interval of periodic invocations, in minutes
 * @property {string} webhook - Webhook URL where trigger notifications will be POSTed, only HTTP and HTTPS protocols supported
 * @property {bigint|string} initialBalance - Initial subscription balance (should be at least 3x the daily fee)
 */

/**
 * @callback SignTransactionCallback - Callback for signing transactions generated by the client
 * @param {string} tx - Transaction XDR to sign
 * @param {{network: string, networkPassphrase: string, accountToSign: string}} context - Signing context
 * @return {Promise<string>} - Signed transaction XDR
 */