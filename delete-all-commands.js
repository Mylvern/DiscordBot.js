const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');

const rest = new REST({ version: '10' }).setToken(token);


(async () => {
	try {
		console.log(`Started deleting all your application (/) commands.`);

		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: [] },
		);

		console.log(`Successfully deleted all your application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();