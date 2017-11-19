import config from './config'

import { handler, ConfigurationError } from './errors'
import command from './commands'

import Discord from 'discord.js'
const client = new Discord.Client()

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
	command(msg)
})

client.login(config.token)

export default client
