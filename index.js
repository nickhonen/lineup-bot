// Require the necessary discord.js classes
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./utils/config.js');
const db = require('./utils/dbInit')
const fs = require('node:fs');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Logic to set all the commands to use, uses code from deploy-commands.js
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

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



// Login to Discord with your client's token
client.login(token);