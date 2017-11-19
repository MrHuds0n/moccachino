import client from '..'
import config from '../config'

export function handler(msg, error) {
	console.log(error.name, error.message, error.stack)

	client.channels.get(config.debugChannel).sendMessage(
`:${error.emoji}: **${error.name}**: ${error.message}
\`\`\`${error.stack}\`\`\`
\`\`\`${msg.author.username}#${msg.author.discriminator} ${msg.channel.name} @ ${msg.guild.name}
${msg.content}\`\`\``
	)

	msg.reply(`:${error.emoji}: **${error.name}** : ${error.message}`)
}
