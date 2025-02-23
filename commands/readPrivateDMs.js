
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .addUserOption((option) => 
        option.setName("user")
        .setDescription("User to see the messages")
        .setRequired(true)
    )
    .setName("read messages")
    .setDescription("Prints the messages with the selected user")
}