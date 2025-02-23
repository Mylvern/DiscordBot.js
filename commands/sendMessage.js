// Requires the SlashCommandBuilder NEEDED FOR EVERY COMMAND
const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const https = require("https");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .addUserOption((option) =>
      option.setName("user").setDescription("User to troll").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("Message to send")
        .setRequired(true)
    )
    .addAttachmentOption((option) =>
      option.setName("image").setDescription("Image to send").setRequired(true)
    )
    .setName("troll")
    .setDescription("get rekt noob"),
   execute(interaction) {

    const user = interaction.options.getUser("user");
    const message = interaction.options.getString("message");
    const image = interaction.options.getAttachment("image");

    if (
      image.contentType !== "image/webp" &&
      image.contentType !== "image/png" &&
      image.contentType !== "image/jpeg" &&
      image.contentType !== "image/gif"
    ) {
      interaction.reply({
        content: `Your image is not valid, please use valid extentions (webp, png, jpg/jpeg)`,
        ephemeral: true,
      });
      return;
    }


    const contentType = image.contentType.split("/")[1];
    const file = fs.createWriteStream("file." + contentType);
    https.get(image.url, function (response) {
      response.pipe(file);

      // after download completed close filestream
      file.on("finish", () => {
        file.close();
		    sendAttachment(interaction, user, message, image, file);

    });
	});

	


  },
};

function sendAttachment(interaction, user, message, image, file)
{
	const attachment = new AttachmentBuilder(file.path)

	interaction.client.users.cache
	  .get(user.id)
	  .send({ content: message, files: [attachment] });

	
  
    interaction.reply({
	  content: "Message sent!",
	  files: [attachment],
	  ephemeral: true,
	});
}
