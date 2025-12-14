
const { SlashCommandBuilder, ChannelType, ChatInputCommandInteraction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("move-user")
        .setDescription("Moves user x amounts of times")
        .addUserOption(option => 
            option.setName('user')
            .setDescription('User to move')
            .setRequired(true)
        )
        .addChannelOption(option => 
            option.setName('channel')
            .setDescription("Channel to move the user to")
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildVoice)
        )
        .addIntegerOption(option => 
            option.setName('amount')
            .setDescription("How many times the user is moved (even number to bring them back)")
            .setRequired(true)
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @returns 
     */
    async execute(interaction)
    {
        if (!interaction.isChatInputCommand()) return;

        const moveChannel = interaction.options.getChannel("channel");
        if (moveChannel === null)
            return;

        let message = "";
    


        console.log(`${message} moved to ${moveChannel.name}`);

        const user = interaction.options.getUser('user');
        const member = await interaction.guild?.members.fetch(user.id);
        // const moveChannel = interaction.options.getChannel('channel');
        const channel = member.voice.channel;
        const amount = interaction.options.getInteger('amount');

        if (amount == null)
        {
            interaction.reply({
                content: `You must include an amount`,
                ephemeral: true,
              });
              return;
        }

        // const members = interaction.member.voice.channel.members;


        for (let i = 1; i <= amount; i++)
        {
            if (i % 2 == 0)
            {
                member.voice.setChannel(channel.id);
            }
            else if (i % 2 == 1)
            {
                member.voice.setChannel(moveChannel.id)
            }
        }
        // for (const [memberID, member] of members) {
        //     message += `,${member.user.tag}`;
        //     for (let i = 1; i <= amount; i++)
        //     {
        //         if (i % 2 == 0)
        //         {
        //             member.voice.setChannel(channel.id);
        //         }
        //         else if (i % 2 == 1)
        //         {
        //             member.voice.setChannel(moveChannel.id)
        //         }
        //     }
        // }
        //         interaction.reply({
        //     content: `${message} moved to ${moveChannel.name}`,
        //     ephemeral: true,
        // });
        interaction.reply({content: `${user.username} moved from ${channel.name} to ${moveChannel.name} a total of ${amount} time(s)`, ephemeral: true})
    }
}