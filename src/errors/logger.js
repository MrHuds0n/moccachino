import { client } from '..'
import config from '../config'

export function logger(error) {
	if(error.name === "ReferenceError") error.emoji = "question"
	else if(error.name === "SyntaxError") error.emoji = "books"

	if(!error.emoji) error.emoji = "exclamation"

	client.channels.get(config.debugChannel).send(
`:${error.emoji}: **${error.name}**: ${error.message}
\`\`\`${error.stack}\`\`\``
	)
}
