// This command changes config values in user/guild config entries in the database.

import { client } from '..'
import { Guild } from '../models'
import { handler, ConfigurationError } from '../errors'

export default async function(message, command, ...args) {
	if(command !== 'configure') return

	if(args[0] === 'guild') {
		try {
			let lookup
			try {
				lookup = await Guild.get(message.guild.id).run()
			}
			catch(error) {
				if(!lookup) {
					throw new ConfigurationError("There is no configuration for this guild! (Have you tried `.init guild`?)")
				}
			}

			if(!args[1]) {
				throw new SyntaxError('Provide a config value to edit.')
			}

			if(!lookup.config[args[1]]) {
				throw new SyntaxError(`There is no config option: \`${args[1]}\`!`)
			}

			lookup.config[args[1]] = args[2]

			lookup.save()
			message.reply(`:sparkles: Guild config successfully updated: \`${args[1]}: ${args[2]}\``)
			message.delete()

			return lookup
		}
		catch(error) {
			handler(message, error)
		}
	}
	
}
