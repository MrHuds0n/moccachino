// Checks permissions of a particular user.

import { client } from '..'
import { isAdmin } from '../utils'
import { isMod } from '../utils'

export default async function(message, command, ...args) {
	if(command !== 'permissions') return

	if(await isAdmin(message)) {
		message.reply("You are an administrator.")
		message.delete()
	}

	else if(await isMod(message)) {
		message.reply("You are a moderator.")
		message.delete()
	}

	else {
		message.reply("You are just a regular user.")
		message.delete()
	}

}
