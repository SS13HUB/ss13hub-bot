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
    run: async (client, interaction) => { // Permissions.FLAGS.ADMINISTRATOR?
        if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return interaction.reply({ content: `You can only add servers with ADMINISTRATOR authorization.` });
        const inviteCode = interaction.options.getString("invite");
        if (!inviteCode) return interaction.reply({ content: `There isn't any invite link!` });
        
        //const fetchedInvite = await _fetchInvite(client, inviteCode); //('https://discord.gg/djs')
        //const fetchedInvite = await client.fetchInvite(inviteCode);
        const fetchedInvite = await client.fetchInvite(inviteCode)
            .then((data) => {
                return data;
            })
            .catch((e) => {
                if (e.message == "Unknown Invite" || fetchedInvite.message.code == 10006 || e.message.httpStatus == '404') {
                    return {"code": inviteCode, "message": e};
                }
                return null;
        });
        if (fetchedInvite.message !== undefined) {
            if (fetchedInvite.message == "Unknown Invite" || fetchedInvite.message.code == 10006 || fetchedInvite.message.httpStatus == 404) {
                const inviteToButtonInvite = new client.discord.MessageEmbed()
                    .setTitle(':chains: ・ Invite link info')
                    .addField('Invite Code', `[${fetchedInvite.code}](https://discord.com/api/invite/${fetchedInvite.code}?with_counts=true&with_expiration=true)`, true)
                    .addField('Invite Status', `${fetchedInvite.message}`, true) // :coffin:
                    .setColor(client.config.embedColor)
                console.log(`[CMD] ${interaction.user.id} trigger invite2button: ${fetchedInvite.code} (dead, ${fetchedInvite.message})`);
                return interaction.reply({ embeds: [inviteToButtonInvite] });
                //return interaction.reply({ content: `Invite link is unknown! (was killed or not created yet)` });
            }
        }
        if (fetchedInvite === null) {
            return interaction.reply({ content: `Error: ${e}; message:${e.message}` });
        }
        
        const inviteToButtonInvite = new client.discord.MessageEmbed()
            .setColor(client.config.embedColor)
            .setTitle(':chains: ・ Invite link to button') // :anchor:
            .addField('Invite Code', `[${fetchedInvite.code}](https://discord.com/api/invite/${fetchedInvite.code}?with_counts=true&with_expiration=true)`, true)
            .setDescription(`Check button below.`);

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('invite2button_primary')
                    .setLabel(fetchedInvite.code)
                    .setURL(`${fetchedInvite.url}?with_counts=true&with_expiration=true`)
                    .setStyle('LINK'),
            );

        /* if (client.guilds.cache.get(fetchedInvite.guild.id) === undefined) {
            const embedWidget = new client.discord.MessageEmbed()
                .setColor(client.config.embedColor)
                .setTitle(':mirror: ・ Widget info') // :anchor:
                .addField('Widget',
                `[URL](https://discord.com/widget?id=${fetchedInvite.guild.id}&theme=dark), [API 1](https://discord.com/api/guilds/${fetchedInvite.guild.id}/widget.json), [API 2](https://discord.com/api/guilds/${fetchedInvite.guild.id}/embed.json)`, true)
                .addField('Widget Status', `-`, true)
                .setThumbnail(fetchedInvite.guild.iconURL())
            console.log(`[CMD] ${interaction.user.id} trigger invite2button: (${fetchedInvite})`);
            return interaction.reply({ embeds: [embed] });
        } */
        console.log(`[CMD] ${interaction.user.id} trigger invite2button: (${fetchedInvite.code})`); //${(fetchedWidget !== undefined ? fetchedWidget.id : "widget unknown")}
        //console.log(fetchedWidget.channels.map((channel) => [channel.id, channel.name]));
        //console.log(fetchedWidget.channels.mapValues((channel) => [channel.id, channel.name]));
        await interaction.reply({ embeds: [inviteToButtonInvite], components: [row] });
    },
};
