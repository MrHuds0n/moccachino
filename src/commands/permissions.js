// Checks permissions of a particular user.

import { client } from '..'
import { isAdmin } from '../utils/isAdmin'

export default async function(message, command, ...args) {
	if(command !== 'permissions') return

	if(await isAdmin(message)) {
		message.reply("You are an admin.")
		message.delete()
	}

}
