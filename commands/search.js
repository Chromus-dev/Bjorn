const { prefix, color } = require('../config.json');

module.exports = {
    name: 'search',
    aliases: ["google","s"],
    usage: "[query]",
    description: "Sends a link to a google search.",
    availableTo: "@everyone",
	execute(message, args) {
        var embed
        if (args.length!=0) response = `https://www.google.com/search?q=${encodeURI(args.join(" "))}`
        else response = `You need to say what you want to search for! Usage: \`${prefix}${this.name} ${this.usage}\``
        return message.channel.send(response)
        .catch(error => {
            message.reply('There was an error searching for that.')
        })
    },
}
