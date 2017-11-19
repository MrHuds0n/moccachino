import client from '..'
import config from '../config'

import ping from './ping'

import init from './init'
import configure from './configure'

export default function(message) {
	if(message.content.startsWith(config.prefix)) {
		let command = message.content.split(/[ \t]+/)
		command[0] = command[0].slice(1)

		ping(message, ...command)

		init(message, ...command)
		configure(message, ...command)
	}
}
