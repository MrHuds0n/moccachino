export class ConfigurationError extends Error {
	constructor(message) {
		super(message)
		this.name = "ConfigurationError"
		this.emoji = "gear"
	}	
}
