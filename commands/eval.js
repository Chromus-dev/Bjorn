// https://anidiots.guide/examples/making-an-eval-command

const { client } = require('../index')

const clean = text => {
	if (typeof(text) === "string")
		return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203))
	else
		return text
}

module.exports = {
	name: 'eval',
	description: 'Runs direct JS code.',
	availableTo: "<@634776327299399721>",
	aliases: [],
	async execute(message, args) {

		if (message.author.id !== '634776327299399721') return message.channel.send('You don\'t have permission to do that!')

		try {

			const channel = message.channel
			const fetchMsg = id => channel.messages.fetch(id)
			const getMsg = id => channel.messages.cache.get(id)
			const getChannel = id => message.guild.channels.cache.get(id)

			const code = args.join(" ")
			let evaled = await eval(`(async () => {${code}})()`)

			if (typeof evaled !== "string")
				evaled = require("util").inspect(evaled)

			if (evaled.includes(client.token))
				return message.channel.send('Token blocked!')

			message.channel.send(clean(evaled), {code:"xl"})

		} catch (err) {

			message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``)
			
		}
	},
}
