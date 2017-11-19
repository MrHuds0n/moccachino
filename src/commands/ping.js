import client from '..'

export default function(message, command, ...args) {
	if(command !== 'ping') return

	message.reply('Pong!')
	
}
