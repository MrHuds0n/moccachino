import config from './config'

import { handler, ConfigurationError } from './errors'
import command from './commands'
import { playerlist } from './processes'

import Discord from 'discord.js'
const client = new Discord.Client()

import Disco from 'discoverygc'
const disco = new Disco({key: config.discoveryApi})

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`)
	playerlist()
})

client.on('message', msg => {
	command(msg)
})

client.login(config.token)

export { client, disco }
