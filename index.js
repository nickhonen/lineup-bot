// Require the necessary discord.js classes
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./utils/config.js');
// Node's file system module
const fs = require('node:fs');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Logic for event handler, dynamically retrieves events in events folder
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});


// Listens for interactions, don't use if/else for this just a placeholder
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Login to Discord with your client's token
client.login(token);