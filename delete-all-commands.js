const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const dotenv = require('dotenv');

dotenv.config();


const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);


(async () => {
	try {
		console.log(`Started deleting all your application (/) commands.`);

		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
			{ body: [] },
		);

		console.log(`Successfully deleted all your application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();