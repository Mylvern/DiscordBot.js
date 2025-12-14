
const { SlashCommandBuilder, ChannelType, ChatInputCommandInteraction } = require('discord.js');
const {deafenMember} = require("../functions/deafenRandomMember");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("deafen")
        .setDescription("shhhhh."),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @returns 
     */
    async execute(interaction)
    {
        if (!interaction.isChatInputCommand()) return;
        
        const member = await interaction.guild?.members.fetch(interaction.user.id);
        const members = member.voice.channel.members;

        const interval = setInterval(deafenMember.bind(this, members), 10000);
        

        interaction.reply({content: `deafened`, ephemeral: true});
        return interval;
    }
}