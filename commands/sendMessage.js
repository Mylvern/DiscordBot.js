// Requires the SlashCommandBuilder NEEDED FOR EVERY COMMAND
const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const Canvas = require('@napi-rs/canvas');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('troll')
		.setDescription('get rekt noob'),
	async execute(interaction) {
		// interaction.guild is the object representing the Guild in which the command was run
		// Create a 700x250 pixel canvas and get its context
		// The context will be used to modify the canvas
		const canvas = Canvas.createCanvas(700, 250);
		const context = canvas.getContext('2d');

		
		const background = await Canvas.loadImage('./amogus.jpg');

		// This uses the canvas dimensions to stretch the image onto the entire canvas
		context.drawImage(background, 0, 0, canvas.width, canvas.height);

		// Use the helpful Attachment class structure to process the file for you
		const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });

		interaction.client.users.cache.get('354711260585000962').send({content : "AMOGUS DEMANDS YOU, SERVE YOUR COUNTRY NOW!", files : [attachment]});

		interaction.reply({ content: "Message sent!", files: [attachment], ephemeral: true });
		
	}
};
