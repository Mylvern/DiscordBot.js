// Requires the SlashCommandBuilder NEEDED FOR EVERY COMMAND
const { SlashCommandBuilder, Embed } = require('discord.js');

// Exports the data so it can be Required in other files
module.exports = {
    // Contains data like the Name and the Description
	data: new SlashCommandBuilder()
		.addUserOption((option) =>
		
			option.setName("user")
			.setDescription("User to Ping")
			.setRequired(true)
		)
		.setName('ping')
		.setDescription('Replies with Pong!'),
    // executes when the command is called
	async execute(interaction) {
		const user = interaction.options.getUser("user");
		for (let i = 0; i < 100; i++) {
		interaction.channel.send(`<@${user.id}>`)
		}
	},
};