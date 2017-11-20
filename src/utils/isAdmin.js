import { client } from '..'
import { Guild } from '../models'
import { handler, ConfigurationError } from '../errors'

export async function isAdmin(message) {
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

		const { adminGroup } = config.config
		const admin = message.guild.roles.find('name', adminGroup)
			
		if(!admin) throw new ConfigurationError(`There is no group ${adminGroup}`)

		if(admin.members.get(message.author.id))
			return true
		else return false
	}	
	catch(error) {
		handler(message, error)
		return false
	}

}
