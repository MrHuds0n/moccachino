// Checks permissions of a particular user.

import { client } from '@'
import { isAdmin } from '@/utils'
import { isMod } from '@/utils'

export const permissions = async function(message, command, ...args) {
	if(command !== 'permissions') return

	if(await isAdmin(message)) {
		message.reply(':crown: You are an administrator.')
		message.delete()
		return true
	}

	else if(await isMod(message)) {
		message.reply(':crossed_swords: You are a moderator.')
		message.delete()
		return true
	}

	else {
		message.reply(':person_with_blond_hair: You are just a regular user.')
		message.delete()
		return false
	}

}
