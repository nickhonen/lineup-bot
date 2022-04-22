const { SlashCommandBuilder } = require('@discordjs/builders');
const { sequelize, Tags } = require('../dbpractice')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addtag')
		.setDescription('Creates a new tag')
		.addStringOption(option => option.setName('name').setDescription('Enter a tag name'))
		.addStringOption(option => option.setName('description').setDescription('Tag description')),     
	async execute(interaction) {
		const tagName = interaction.options.getString('name');
		const tagDescription = interaction.options.getString('description');

		try {
			// equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
			const tag = await Tags.create({
				name: tagName,
				description: tagDescription,
				username: interaction.user.username,
			});

			return interaction.reply(`Tag ${tag.name} added.`);
		}
		catch (error) {
			if (error.name === 'SequelizeUniqueConstraintError') {
				return interaction.reply('That tag already exists.');
			}

			return interaction.reply('Something went wrong with adding a tag.');
		}
	}
};