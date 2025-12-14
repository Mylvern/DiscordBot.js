import fs from 'fs';
import path from 'path';
import { Client, Collection, Events, GatewayIntentBits, Partials } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();
let interval : NodeJS.Timer | null = null;

// Create a new client instance
const client = new Client({
	intents: [
	  GatewayIntentBits.Guilds,
	  GatewayIntentBits.GuildMessages,
	  GatewayIntentBits.GuildVoiceStates,
	  GatewayIntentBits.DirectMessages,
	  GatewayIntentBits.MessageContent
	],
	partials: [
		Partials.Channel,
		Partials.Message
	]
  });


const commands = new Collection() as {
	[key: string] : any
};

const commandsPath = path.join(__dirname, './commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));
const commandFiles2 = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));


for (const file of commandFiles){
	// path of the current file
	const filePath = path.join(commandsPath, file);

	const command = require(filePath);

		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
}
for (const file of commandFiles2){
	// path of the current file
	const filePath = path.join(commandsPath, file);

	const command = require(filePath);

		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
}
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(process.env.TOKEN)


client.on(Events.InteractionCreate, async interaction => {

	if (!interaction.isChatInputCommand())
		return;
	//console.log(interaction);
	const command = commands.get(interaction.commandName);
	if (!command)
	{
		console.error(`No command matching ${interaction.commandName} was found.`)
		return;
	}
	try 
	{
		if (interaction.commandName == "undeafen") {
			if (interval != null) {
				clearInterval(interval);
				interval = null;
			}

		}
		const result = await command.execute(interaction);
		if (interaction.commandName == "deafen") {
			interval = result;
		}

	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true});
	}
});

