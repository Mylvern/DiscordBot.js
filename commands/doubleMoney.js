// Requires the SlashCommandBuilder NEEDED FOR EVERY COMMAND
const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const {addUser} = require("../functions/addUser");


const data = new SlashCommandBuilder()
.setName('bet')
.setDescription('Play some heads or tails, you win, you double your bet, but if you lose, you lose your bet')
.addIntegerOption((option) =>
        option.setName("amount")
        .setDescription("The amount to bet")
        .setMinValue(10)
        .setRequired(true));

function execute(interaction)
{
    if (!interaction.isChatInputCommand()) return;
    const user = interaction.user.username
    const index = addUser(user);

    const json = require('data/money.json')
    const moneyJSON = JSON.parse(json);
    const num = Math.round(Math.random());


    const bet = interaction.options.getInteger("amount") ?? 0;

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
}

module.exports = 
{
    data: data,
    execute
}