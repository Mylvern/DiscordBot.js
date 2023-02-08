// Requires the SlashCommandBuilder NEEDED FOR EVERY COMMAND
const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const {addUser} = require("./addUser")


// Exports the data so it can be Required in other files
module.exports = {
    // Contains data like the Name and the Description
	data: new SlashCommandBuilder()
		.setName('bal')
		.setDescription('Shows how much money you have'),
    // executes when the command is called
	async execute(interaction) {
		const user = interaction.user.tag
		const index = addUser(user);
		const moneyJSON = JSON.parse(fs.readFileSync("data/money.json"));
		interaction.reply({content: `You have ${moneyJSON[index]["money"]}$`})
		console.log(moneyJSON.length);
	},
};