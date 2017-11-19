import client from '..'
import config from '../config'

export function handler(msg, error) {
	console.log(error.name, error.message, error.stack)

	if(error.name === "ReferenceError") error.emoji = "question"
	else if(error.name === "SyntaxError") error.emoji = "books"

	if(!error.emoji) error.emoji = "exclamation"

	client.channels.get(config.debugChannel).sendMessage(
`:${error.emoji}: **${error.name}**: ${error.message}
\`\`\`${error.stack}\`\`\`
\`\`\`${msg.author.username}#${msg.author.discriminator} ${msg.channel.name} @ ${msg.guild.name}
${msg.content}\`\`\``
	)

	msg.reply(`:${error.emoji}: **${error.name}** : ${error.message}`)
}
