// Example of how to make a SlashCommand

module.exports = {
    name: "debug_command",
    category: "Debug",
    options: [
        {
            name: 'param1',
            description: 'no desc.',
            type: 'STRING',
            required: false
        },
        {
            name: 'param2',
            description: 'no desc.',
            type: 'STRING',
            required: false
        }
    ],
    description: "Not for public use, sorry.",
    ownerOnly: true,
    run: async (client, interaction) => {
        const messageId = interaction.options.getString("param1"); // "id"
        if (!messageId) return interaction.reply({ content: `There isn't any message IDs!` });

        await msg.channel.messages.fetch(messageId)
            .then(message => console.log(message.content))
            .catch(console.error);

        const getEmbedsEmbed = new client.discord.MessageEmbed()
            .setDescription(`In console.`);

        await interaction.reply({ embeds: [getEmbedsEmbed] });
    },
};
