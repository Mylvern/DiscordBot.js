import { SlashCommandBuilder, ChannelType, ChatInputCommandInteraction } from 'discord.js';
import { VoiceConnectionStatus, AudioPlayerStatus, joinVoiceChannel, createAudioPlayer, NoSubscriberBehavior, createAudioResource, getVoiceConnection} from '@discordjs/voice';

import https from 'https';
import fs from 'fs';

import youtubedl from 'youtube-dl-exec';
import ytdl from '@distube/ytdl-core';
import {generate} from 'youtube-po-token-generator';
import {createTask} from 'youtube-po-token-generator/lib/task.js';
import {ClientType, Innertube} from 'youtubei.js';

// Exports the data so it can be Required in other files

export const data = new SlashCommandBuilder()
		.setName('play-audio')
		.setDescription('Plays an audio')
    .addStringOption((option) => 
      option.setName("link").setDescription("Link to play").setRequired(true)
);

export async function execute(interaction) {
                const member = await interaction.guild?.members.fetch(interaction.user.id);
                
                const channel = member.voice.channel;
                // const visitorData = (await generate()).visitorData;
                // const task = await createTask(visitorData);
                // const {poToken} = task.start();
                // const innertube = await Innertube.create( {
                //   client_type: ClientType.WEB,
                //   retrieve_player: true,
                //   device_category:'desktop',
                //   po_token: poToken
                // });

                const link = interaction.options.getString('link');
                // console.log(await ytdl.getInfo(link));
                ytdl("http://www.youtube.com/watch?v=aqz-KE-bpKQ", {
                }).pipe(fs.createWriteStream('./data/file.mp4'));
                // ytdl(link).pipe(fs.createWriteStream('./data/file.mp4'));

                // const videoInfo = await innertube.getInfo(link);
                // videoInfo.download({
                //   codec: 'mp4a',
                //   type: 'audio'
                // })
                
                return;
                // const audio = interaction.options.getAttachment('audio');
                console.log('test1');

                try {
                             
                } catch (error) {
                  console.error(error);
                }

                // const contentType = audio.contentType.split("/")[1];
                // const file = fs.createWriteStream("./data/file.mp3");
                const player = createAudioPlayer({
                  behaviors: {
                    noSubscriber: NoSubscriberBehavior.Pause
                  }
                });
                return;
                https.get(audio.url, function (response) {
                      response.pipe(file);
                
                      // after download completed close filestream
                      file.on('finish', () => {
                        file.close();
                        const resource = createAudioResource('./data/file.mp3');
                        player.play(resource);
                      });
                });
                const connection = getVoiceConnection(channel.guild.id);

                connection.subscribe(player);
};




// module.exports = {
//     // Contains data like the Name and the Description
// 	data: data,
//     // .addAttachmentOption((option) =>
//     //   option.setName("audio").setDescription("Audio to play").setRequired(true)
//     // ),
//     // executes when the command is called
  
	
// };