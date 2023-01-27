// Requires the SlashCommandBuilder NEEDED FOR EVERY COMMAND
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('troll')
		.setDescription('get rekt noob'),
	async execute(interaction) {
		// interaction.guild is the object representing the Guild in which the command was run
		await interaction.
        const guild = await client.guilds.fetch(guildId)
        guild.
	},
};
