import { client } from '..'
import { Guild } from '../models'
import { handler, ConfigurationError } from '../errors'

export async function isMod(message) {
	try {
		let config
		try {
			config = await Guild.get(message.guild.id).run()
		}
		catch(error) {
			if(!config) {
				return true
			}
		}

		const { moderatorGroup } = config.config
		const moderator = message.guild.roles.find('name', moderatorGroup)
			
		if(!moderator) throw new ConfigurationError(`There is no group ${moderatorGroup}`)

		if(moderator.members.get(message.author.id))
			return true
		else return false
	}	
	catch(error) {
		handler(message, error)
		return false
	}

}
