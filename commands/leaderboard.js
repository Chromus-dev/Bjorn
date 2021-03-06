const { queryXP, sortRanks, giveXP } = require("../levelling.js")
const { MessageEmbed } = require("discord.js")

module.exports = {
	name: 'leaderboard',
	description: "Get's the users with the top XP.",
	availableTo: "@everyone",
	aliases: ['lb'],
	execute(message, args) {

		giveXP(message.member, 0, false)

		const sortedRanks = sortRanks(message.guild)
		const top10 = sortedRanks.splice(0, 10)
		const authorInTop10 = top10.some(element => element.id == message.author.id)

		let description = ''

		top10.forEach((element, index) => {
			const member = message.guild.members.cache.get(element.id)
			description += `**${index+1}**: ${member.nickname ? `${member.nickname} (${member.user.username})` : member.user.username} - ${element.points} points\n`
		})

		if (!authorInTop10) {
			const authorXP = queryXP(message.author.id)
			description += `\n**${sortRanks(message.guild).findIndex(element => element.id == message.author.id) + 1}**: ${message.member.nickname ? `${message.member.nickname} (${message.member.user.username})` : message.member.user.username} - ${authorXP.points} points`
		}

		message.channel.send({ embed:
			new MessageEmbed() 
				.setColor(message.guild.me.displayHexColor)
				.setTitle('Leaderboard')
				.setTimestamp()
				.setDescription(description)
		})

	}
}
