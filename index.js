const fs = require('node:fs');
const path = require('node:path');

// Require the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits, Intents } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({
	intents: [
	  GatewayIntentBits.Guilds,
	  GatewayIntentBits.GuildMessages,
	  GatewayIntentBits.GuildVoiceStates
	],
  });

client.commands = new Collection();
// Path to the command directory
const commandsPath = path.join(__dirname, 'commands');
// Command files, all files that end with .js in the ${commandsPath} directory
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles){
	// path of the current file
	const filePath = path.join(commandsPath, file);

	const command = require(filePath);

		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
}
// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token)

client.on(Events.InteractionCreate, async interaction => {
	//console.log(interaction);
	const command = interaction.client.commands.get(interaction.commandName);
	if (!command)
	{
		console.error(`No command matching ${interaction.commandName} was found.`)
		return;
	}

	try 
	{
		await command.execute(interaction);
		
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true});
	}
});

