import { client, disco } from '..'
import { Guild } from '../models'
import { logger, ConfigurationError, ConnectionError } from '../errors'

export async function playerlist() {
	try {
		let data
		try {
			data = await disco.players()
		}
		catch(error) {
			throw new ConnectionError("Couldn't fetch player data.")
		}

		client.guilds.map(async (guild) => {
			let config

			try {
				config = await Guild.get(guild.id).run()
			}
			catch(error) {
				if(!config) return
			}

			const playerlistChannel = guild.channels.find('name', config.config.playerlistChannel)

			if(playerlistChannel) {
				let lastMessage = await playerlistChannel.fetchMessages({limit: 1})
				lastMessage = lastMessage.array()

				if(lastMessage.length > 0 && lastMessage[0].editable) {
					lastMessage = lastMessage[0]
					try {
						lastMessage.edit({embed: formatPlayerlist(data.players)})
					}
					catch(error) {
						console.log(error)
						throw new Error("Can't edit the playerlist message.")
					}
				}
				else {
					try {
						await playerlistChannel.send({embed: formatPlayerlist(data.players)})
					}
					catch(error) {
						throw new Error("Cannot post the playerlist message.")
					}
				}
			}
		})
	}
	catch(error) {
		logger(error)
	}
}

function formatPlayerlist(playerlist) {
	let embed = {
		title: `${playerlist.length} players`,
		timestamp: new Date()
	}

	const sorted = playerlist.sort((a, b) => {
		return (a.system > b.system) ? 1 : -1
	})

	let players = sorted.reduce((acc, player) => {
		return acc + `${player.name}\n`
	}, '')

	let systems = sorted.reduce((acc, player) => {
		return acc + `${player.system}\n`
	}, '')

	embed.fields = [
		{
			name: 'Player',
			value: players,
			inline: true
		},
		{
			name: 'System',
			value: systems,
			inline: true
		}
	]

	return embed
}
