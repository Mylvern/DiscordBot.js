const { SlashCommandBuilder, ChannelType, ChatInputCommandInteraction } = require('discord.js');
const { VoiceConnectionStatus, AudioPlayerStatus, getVoiceConnection, joinVoiceChannel} = require('@discordjs/voice');

const path = require('path');
const ffmpegStatic = require('ffmpeg-static');
const ffmpeg = require('fluent-ffmpeg');
// Exports the data so it can be Required in other files
module.exports = {
    // Contains data like the Name and the Description
    data: new SlashCommandBuilder()
		.setName('join-channel')
		.setDescription('Joins channel2'),
    // executes when the command is called
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
	async execute(interaction) {
                const member = await interaction.guild?.members.fetch(interaction.user.id);
                
                const channel = member.voice.channel;
                
                const connection = joinVoiceChannel({
                  channelId: channel.id,
                  guildId: channel.guild.id,
                  adapterCreator: channel.guild.voiceAdapterCreator,
                });

        },
};