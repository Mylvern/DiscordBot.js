// Requires the SlashCommandBuilder NEEDED FOR EVERY COMMAND
const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const {addUser} = require("../functions/addUser");


// Exports the data so it can be Required in other files
module.exports = {
    // Contains data like the Name and the Description
	data: new SlashCommandBuilder()
		.setName('bet')
		.setDescription('Play some heads or tails, you win, you double your bet, but if you lose, you lose your bet')
        .addIntegerOption((option) =>
                option.setName("amount")
                .setDescription("The amount to bet")
                .setMinValue(10)
                .setRequired(true)
            ),
    // executes when the command is called
	async execute(interaction) {
		const user = interaction.user.username
		const index = addUser(user);
		const moneyJSON = JSON.parse(fs.readFileSync("data/money.json"));
        const num = Math.round(Math.random())
        const bet = interaction.options.getInteger("amount");
        console.log(index);
        let money = moneyJSON[index]["money"];
        if (bet > money)
        {
            interaction.reply({content: `You don't have enough! You cannnot bet more than ${money}$`})
            return;
        }
        if (num === 1)
        {
            money -= bet;
            interaction.reply({content: `You lost! You now have ${money}$`});
        }
        else
        {
            money += bet;
            interaction.reply({content: `You won! You now have ${money}$`});
        }
        moneyJSON[index]["money"] = money;
        fs.writeFileSync("data/money.json", JSON.stringify(moneyJSON));
	},
};