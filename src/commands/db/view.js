import { client } from '@'
import { Guild, User } from '@/models'
import { handler, ConfigurationError } from '@/errors'
import { isAdmin } from '@/utils'

export async function view(message, command, ...args) {
	if(command !== 'view') return

	if(args[0] === 'guild') {
		message.reply('pong')
	}
}
