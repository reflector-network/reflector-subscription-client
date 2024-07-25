import {StrKey} from '@stellar/stellar-sdk'

export default {
    validateRequired(value, paramName) {
        if (!value)
            throw new TypeError(`Parameter "${paramName}" is required`)
        return value
    },
    validateNumber(value, paramName) {
        this.validateRequired(value, paramName)
        if (typeof value !== 'number')
            throw new TypeError(`Parameter "${paramName}" - number expected`)
        return value
    },
    validateString(value, paramName) {
        this.validateRequired(value, paramName)
        if (typeof value !== 'string' || !value.length)
            throw new TypeError(`Parameter "${paramName}" - string expected`)
        return value
    },
    validateBigint(value, paramName) {
        this.validateRequired(value, paramName)
        if (typeof value !== 'bigint') {
            try {
                value = BigInt(value)
            } catch (error) {
                throw new Error(`Invalid "${paramName}" value`)
            }
        }
        if (value <= 0n)
            throw new Error(`Invalid "${paramName}" value`)
        return value
    },
    validateOwner(owner) { //TODO: generalize
        this.validateString(owner, 'owner')
        if (!StrKey.isValidEd25519PublicKey(owner))
            throw new TypeError('Invalid owner account address')
        return owner
    },
    validateOracle(oracle) {
        this.validateString(oracle, 'source')
        if (!StrKey.isValidContract(oracle))
            throw new TypeError('Invalid oracle contract address')
        return oracle
    },
    validateBalance(amount, paramName) {
        amount = this.validateBigint(amount, paramName)
        return amount
    },
    validateOracleSymbol(oracleToken, paramName) {
        this.validateRequired(oracleToken, paramName)
        this.validateString(oracleToken.source, paramName + '.source')
        this.validateString(oracleToken.symbol, paramName + '.symbol')
        return oracleToken
    },
    validateThreshold(threshold) {
        this.validateNumber(threshold, 'threshold')
        if (threshold < 1)
            throw new Error('Subscription threshold cannot be less than 1‰')
        if (threshold > 10_000)
            throw new Error('Subscription threshold cannot be greater than 10,000‰')
        return Math.floor(threshold) //ensure u32
    },
    validateHeartbeat(heartbeat) {
        this.validateNumber(heartbeat, 'heartbeat')
        if (heartbeat < 5)
            throw new Error('Subscription heartbeat cannot be less than 5 minutes')
        if (heartbeat > 60)
            throw new Error('Subscription heartbeat cannot be greater than 60 minutes')
        return Math.floor(heartbeat) //ensure u32
    },
    validateWebhook(webhook) {
        this.validateString(webhook, 'webhook')
        if (!webhook.startsWith('https://') && !webhook.startsWith('http://'))
            throw new TypeError('Only HTTP and HTTPS webhook URLs are supported')
        if (webhook.length > 2000)
            throw new TypeError('Webhook URL is too long')
        return webhook
    }
}