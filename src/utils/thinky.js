import initThinky from 'thinky'

const thinky = initThinky({
	host: "localhost",
	db: "test"
})

const r = { thinky }

export {thinky, r}
