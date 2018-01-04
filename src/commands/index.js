import { client } from '..'
import config from '../config'

import ping from './ping'

import init from './init'
import configure from './configure'
import view from './view'
import permissions from './permissions'

export default function(message) {
	let isCommand = false
	for(let each of config.prefix) {
		if(message.content.startsWith(each)) {
			isCommand = true
			break
		}
	}

	if(isCommand) {
		let command = message.content.split(/[ \t]+/)
		command.shift()

		ping(message, ...command)

		init(message, ...command)
		configure(message, ...command)
		view(message, ...command)
		permissions(message, ...command)
	}
}
