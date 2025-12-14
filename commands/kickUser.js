const { SlashCommandBuilder, ChannelType, ChatInputCommandInteraction } = require('discord.js');
const { VoiceConnectionStatus, AudioPlayerStatus, joinVoiceChannel, createAudioPlayer, NoSubscriberBehavior, createAudioResource} = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick-user")
        .setDescription("kicks user")
        .addUserOption(option => 
            option.setName('user')
            .setDescription('User to kick')
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

        const user = interaction.options.getUser('user');
        const member = await interaction.guild?.members.fetch(user.id);
        // const moveChannel = interaction.options.getChannel('channel');

        const channel = member.voice.channel;
        member.voice.disconnect();

        const player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Pause
            }
        });

        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });

        const resource = createAudioResource('./data/disconnect.mp3');
        player.play(resource);

        connection.subscribe(player);

        player.on('stateChange', (oldState, state) => {
            if (state.status === AudioPlayerStatus.Idle && oldState.status === AudioPlayerStatus.Playing) {
                console.log("test");
                connection.destroy();
            }
        });

        interaction.reply({content: `OK`, ephemeral: true})
    }
}