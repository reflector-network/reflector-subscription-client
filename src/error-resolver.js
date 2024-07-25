import {ContractErrors} from './types.js'

/**
 * Handle simulation errors if any
 * @param {AssembledTransaction} tx
 * @internal
 */
export function processSimulationErrors(tx){
    if (tx.simulation.error) {
        const contractErrorMatch = /HostError: Error\(Contract, #(\d+)\)/.exec(tx.simulation.error)
        if (contractErrorMatch)
            throw new Error('Contract execution error: ' + ContractErrors[contractErrorMatch[1]])
        else
            throw tx.simulation.error
    }
}