import { thinky } from '../utils/thinky'
const type = thinky.type

export const User = thinky.createModel('User', {
	id: type.string(),
	config: {
		libreFm: type.string()
	}
})
