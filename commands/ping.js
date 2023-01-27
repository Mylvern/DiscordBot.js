
// Requires the SlashCommandBuilder NEEDED FOR EVERY COMMAND
const { SlashCommandBuilder } = require('discord.js');

// Exports the data so it can be Required in other files
module.exports = {
    // Contains data like the Name and the Description
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
    // executes when the command is called
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};