const {
  SlashCommandBuilder,
  ChannelType,
  Interaction,
  CacheType,
  GuildMember,
  Guild,
} = require("discord.js");

const { VoiceConnectionStatus, AudioPlayerStatus, joinVoiceChannel, createAudioPlayer, NoSubscriberBehavior, createAudioResource} = require('@discordjs/voice');


// Requires the SlashCommandBuilder NEEDED FOR EVERY COMMAND
const data = new SlashCommandBuilder();
data.setName("move");
data.setDescription("Moves users");
data.addChannelOption((option) =>
  option
    .setName("channel")
    .setDescription("Channel to move to")
    .setRequired(true)
    .addChannelTypes(ChannelType.GuildVoice)
);

async function execute(interaction) {
	if (!interaction.isChatInputCommand()) return;

	const moveChannel = interaction.options.getChannel("channel");
	if (moveChannel === null)
		return;
  	let index = 0;
  	let message = "";

  	for (const [memberID, member] of interaction.member.voice.channel.members) {
    	message += `,${member.user.tag}`;
    	member.voice.setChannel(moveChannel.id).catch(console.error);
    	index++;
  	}

	const player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Pause
            }
    });

    const connection = joinVoiceChannel({
        channelId: moveChannel.id,
        guildId: moveChannel.guild.id,
        adapterCreator: moveChannel.guild.voiceAdapterCreator,
    });

    const resource = createAudioResource('./data/move.mp3');
	player.play(resource);

	connection.subscribe(player);

	player.on('stateChange', (oldState, state) => {
        if (state.status === AudioPlayerStatus.Idle && oldState.status === AudioPlayerStatus.Playing) {
            console.log("test");
            connection.destroy();
        }
    });

  	interaction.reply({
    	content: `${message} moved to ${moveChannel.name}`,
    	ephemeral: true,
  	});
  	console.log(`${message} moved to ${moveChannel.name}`);
}



module.exports = {
	data: data,
	execute
 }
