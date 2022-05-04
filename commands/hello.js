const db = require('../pg/index')
const { SlashCommandBuilder } = require('@discordjs/builders');



module.exports = {
	data: new SlashCommandBuilder()
    // name can only have lowercase letters with no spaces ig
		.setName('addhw')
		.setDescription('Insert Hello World into lineups'),
	async execute(interaction) {

		const text = 'INSERT INTO users(first_name, last_name, email) VALUES($1, $2, $3) RETURNING *'
        const values = ['hello2', 'world2', 'helloworld2@gmail.com']

		try {
			const { rows } = await db.simpleQuery(text, values)
            console.log(rows[0])
			return interaction.reply(`Hello World added! Good shit nick :)`);
		}
		catch (error) {
            console.log(error.stack)
		}
	}
};