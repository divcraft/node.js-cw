const parseArgs = require('minimist')
const handleCommand = require('./modules/handleCommand')

const command = parseArgs(process.argv.slice(2, 3))
delete command._

handleCommand(command)