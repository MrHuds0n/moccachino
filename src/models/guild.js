import { thinky } from '../utils/thinky'
const type = thinky.type

export const Guild = thinky.createModel("Guild", {
	id: type.string(),
	name: type.string(),
	config: {
		adminGroup: type.string(),
		moderatorGroup: type.string(),
		playerlistChannel: type.string()
	}
})
