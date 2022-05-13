
const { Permissions, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: "savetodatabase",
    usage: '/savetodatabase <invite link or ID>',
    category: "Utility",
    options: [
        {
            name: 'input',
            description: 'invite (link or code), channel ID or server ID.', // ToDo: .fetchWebhook(idtoken)
            type: 'STRING',
            required: true
        }
    ],
    description: "I will try to fetch it and save information in my database.",
    ownerOnly: true,
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return interaction.reply({ content: `You can only add servers with ADMINISTRATOR authorization.` });
        const param1 = interaction.options.getString("input");
        if (!param1) return interaction.reply({ content: `There isn't any invite link, channel ID or server ID!` });

        if (typeof param1 !== "string") para1 = `${param1}`;

        var isInvite = await client.fetchInvite(param1)
            .then((d) => {return d})
            .catch(() => {return false});

        var isChannel = await client.channels.fetch(param1)
            .then((d) => {return d})
            .catch(() => {return false});

        var isServer = await client.guilds.fetch(param1)
            .then((d) => {return d})
            .catch(() => {return false});

        const savetodatabaseEmbed = new client.discord.MessageEmbed()
            .setTitle('Save to DB')
            .addField("isInvite", `${isInvite ? "yes" : "No invite detected"}`)
            .addField("isChannel", `${isChannel ? "yes" : "No channel detected"}`)
            .addField("isServer", `${isServer ? "yes" : "No server detected"}`)
            .setColor(client.config.embedColor);

        //console.debug(isInvite, isChannel, isServer);
        console.log(`[CMD] ${interaction.user.id} trigger savetodatabaseEmbed: (${(param1 != null ? param1 : null)})`); //${(fetchedWidget !== undefined ? fetchedWidget.id : "widget unknown")}
        //console.log(fetchedWidget.channels.map((channel) => [channel.id, channel.name]));
        //console.log(fetchedWidget.channels.mapValues((channel) => [channel.id, channel.name]));
        await interaction.reply({ embeds: [savetodatabaseEmbed] });
    },
};
