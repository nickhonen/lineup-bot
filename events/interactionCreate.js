// Listens for interactions

	


module.exports = {
	name: 'interactionCreate',
    // might need to make this an async somehow, potentially look that up
	execute(interaction) {
		if (!interaction.isCommand()) return;

        // you can access client instance from interaction event, source: docs event handling
	    const command = interaction.client.commands.get(interaction.commandName);

	    if (!command) return;

	    try {
		    command.execute(interaction);
	    } catch (error) {
		    console.error(error);
		    interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	    }
	},
};