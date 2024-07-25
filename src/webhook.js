import {encrypt, importRSAKey} from '@reflector/subscription-encryption'
import clientSettings from './client-settings.js'

let pk

/**
 * Encrypt webhook URL
 * @param {string} webhookUrl - URL of the server endpoint that will be listening for the updates
 * @return {Promise<Uint8Array>}
 */
export async function encryptWebhookUrl(webhookUrl) {
    if (!pk) {
        pk = await importRSAKey(base64ToBytes(clientSettings.publicEncryptionKey))
    }
    return encrypt(pk, webhookUrl)
}

function base64ToBytes(base64) {
    const binaryString = atob(base64)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i)
    }
    return bytes
}