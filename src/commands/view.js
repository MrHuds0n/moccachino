import { client } from '..'
import { Guild, User } from '../models'
import { handler, ConfigurationError } from '../errors'
import { isAdmin } from '../utils'

export default async function(message, command, ...args) {
	if(command !== 'view') return

	if(args[0] === 'guild') {
		message.reply('pong')
	}
}
