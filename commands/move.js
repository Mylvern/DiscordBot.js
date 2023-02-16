// Requires the SlashCommandBuilder NEEDED FOR EVERY COMMAND
const { SlashCommandBuilder, ChannelType } = require('discord.js');

// Exports the data so it can be Required in other files
module.exports = {
    // Contains data like the Name and the Description
	data: new SlashCommandBuilder()
		.setName('move')
		.setDescription('Moves users')
        .addChannelOption((option) =>
                option.setName("channel1")
                .setDescription("Channel where you are")
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildVoice)
            )
        .addChannelOption((option) =>
            
                option.setName("channel2")
                .setDescription("Channel to move to")
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildVoice)
            ),
    // executes when the command is called
	async execute(interaction) {
        const originalChannel = interaction.options.getChannel("channel1")
        const moveChannel = interaction.options.getChannel("channel2")
        originalChannel.members.forEach(element => {
            console.log(element["username"])
        });
        `Original channel: ${originalChannel.name} ; Move channel: ${moveChannel.name}`
	},
};