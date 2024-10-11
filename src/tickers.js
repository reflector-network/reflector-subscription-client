/**
 * List tickers available for quotation in subscriptions
 * @param {OracleDataSourceType} source
 * @return {Promise<string[]>}
 */
export async function getAvailableReflectorTickers(source) {
    switch (source) {
        case 'pubnet':
            return await fetchActiveMarkets()
        case 'exchanges':
            return exchangesTickers
    }
    throw new Error('Unknown price feed source: ' + source)
}

async function fetchActiveMarkets() {
    return fetch('https://api.stellar.expert/explorer/public/active-market/USDC-GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN-1')
        .then(response => {
            if (!response.ok)
                throw new Error('Failed to fetch active markets for Pubnet')
            return response.json()
        })
        .then(assets => {
            return assets.map(asset => {
                const parts = asset.split('-')
                if (parts.length < 2)
                    return 'XLM'
                return [parts[0]] + ':' + [parts[1]]
            })
        })
}

const exchangesTickers = ['BTC', 'ETH', 'USDT', 'BNB', 'SOL', 'USDC', 'XRP', 'DOGE', 'TON', 'TRX', 'ADA', 'AVAX', 'SHIB', 'BCH', 'LINK', 'DOT', 'DAI', 'LEO', 'LTC', 'NEAR', 'KAS', 'UNI', 'ICP', 'FET', 'PEPE', 'XMR', 'APT', 'XLM', 'ETC', 'POL', 'FDUSD', 'SUI', 'STX', 'OKB', 'CRO', 'FIL', 'AAVE', 'TAO', 'RENDER', 'IMX', 'HBAR', 'OP', 'MNT', 'ARB', 'VET', 'INJ', 'WIF', 'ATOM', 'MKR', 'FTM', 'GRT', 'MATIC', 'AR', 'HNT', 'BGB', 'RUNE', 'BONK', 'FLOKI', 'THETA', 'ALGO', 'PYTH', 'JASMY', 'JUP', 'BSV', 'SEI', 'KCS', 'LDO', 'QNT', 'TIA', 'ONDO', 'BTT', 'PYUSD', 'CORE', 'OM', 'NOT', 'FLOW', 'BRETT', 'EOS', 'USDD', 'EGLD', 'GT', 'FLR', 'STRK', 'AXS', 'NEO', '1000SATS', 'BEAM', 'GALA', 'XTZ', 'ORDI', 'XEC', 'XAUt', 'WLD', 'CFX', 'AKT', 'POPCAT', 'SAND', 'DYDX', 'BNX', 'ENS']