require('../lib/bootstrap')
const config = require('config')
const logger = require('../lib/logger')
const db = require('../lib/db')

async function main() {
    const host = config.get('server.host')
    const port = config.get('server.port')

    try {
        await db.select(db.raw('1'))
        logger.debug('Database connected')

        logger.debug(`Server is listening on: ${host}:${port}`)
    } catch (err) {
        process.exitCode = 1
        logger.fatal(err)
    } finally {
        logger.debug('finally')
        logger.debug('Close database')
        await db.destory()
        logger.debug('Database closed')
    }
}

main()