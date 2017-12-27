// This command initialises a guild/user with a config in the database.

import { client } from '..'
import { Guild, User } from '../models'
import { handler, ConfigurationError } from '../errors'

export default async function(message, command, ...args) {
	if(command !== 'init') return

	if(args[0] === 'guild') {
		try {
			const lookup = await Guild.filter({id: message.guild.id}).run()

			if(lookup.length > 0) {
				throw new ConfigurationError("There already is a config for this guild.")
			}

			const guild = new Guild({
				id: message.guild.id,
				name: message.guild.name,
				config: {
					adminGroup: args[1] || 'Administrator',
					moderatorGroup: args[2] || 'Moderator',
					playerlistChannel: args[3] || 'playerlist'
				}
			})

			return guild.save()
				.then(() => {
					message.reply(`:sparkles: Guild configuration initialised with the following settings:
					\`\`\`
					adminGroup: ${guild.config.adminGroup}
					moderatorGroup: ${guild.config.moderatorGroup}
					playerlistChannel: ${guild.config.playerlistChannel}
					\`\`\``)

					message.delete()
				})
		}
		catch(error) {
			handler(message, error)
		}
	}

	if(args[0] === 'me') {
		try {
			const lookup = await User.filter({id: message.author.id}).run()

			if(lookup.length > 0) {
				throw new ConfigurationError("There already is a config for this user.")
			}

			const user = new User({
				id: message.author.id,
				config: {
					libreFm: ''
				}
			})

			return user.save()
				.then(() => {
					message.reply(":sparkles: Created a new user!")
					message.delete()
				})
		}
		catch(error) {
			handler(message, error)
		}
	}
}
