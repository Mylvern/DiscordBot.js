
const { SlashCommandBuilder, ChannelType, ChatInputCommandInteraction } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName("undeafen")
        .setDescription("un-shhhhh."),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @returns 
     */
    async execute(interaction)
    {
        interaction.reply({content: `undeafened`, ephemeral: true});
    }
}