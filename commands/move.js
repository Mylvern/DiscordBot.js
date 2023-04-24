// Requires the SlashCommandBuilder NEEDED FOR EVERY COMMAND
const { SlashCommandBuilder, ChannelType, Events } = require('discord.js');

// Exports the data so it can be Required in other files
module.exports = {
    // Contains data like the Name and the Description
	data: new SlashCommandBuilder()
		.setName('move')
		.setDescription('Moves users')
        .addChannelOption((option) =>
                option.setName("channel")
                .setDescription("Channel to move to")
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildVoice)
            ),
    // executes when the command is called
	async execute(interaction) {
        const moveChannel = interaction.options.getChannel("channel")
        for (const [memberID, member] of interaction.channel.members){
            member.voice.setChannel(moveChannel.id).then(() => interaction.reply({ content: `${member.user.tag} Moved to ${moveChannel.name}`, ephemeral: true })).catch(console.error)
        }
	},
};