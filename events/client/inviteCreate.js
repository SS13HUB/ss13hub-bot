
/*
    Warning: This event only triggers if the client has MANAGE_GUILD permissions for the guild, or MANAGE_CHANNELS permissions for the channel.
    https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-inviteCreate
*/

const { Permissions } = require('discord.js');


module.exports = {
    name: 'inviteCreate',

    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        console.log(client.chalk.event, `Event fired: "inviteCreate" (${interaction})`);

        const eventEmbed = new client.discord.MessageEmbed()
            .setTitle(':signal_strength: Invite was created!')
            .setColor(client.config.embedColor)
            .addField('Server ID', `${interaction.guild.id}`, true)
            .addField('Server Name', `${interaction.guild.name}`)
            .addField('Invite Code, Expires at',
            `[${interaction.code}](${interaction.url}), ${(
                interaction.expiresTimestamp === 0 ?
                    interaction.guild.vanityURLCode === null ?
                        "Never (unless manual revoke)" :
                        "Vanity links doesn't expires (unless manual revoke or edit)" :
                    new Date(interaction.expiresTimestamp).toLocaleString("ru-RU")
                )}`) // "*This is Vanity or Widget link *" vanity or widget links doesn't have inviters
            .addField('Inviter', `${(interaction.inviter === null ? (interaction.guild.vanityURLCode !== null ? "*Generated by vanity link*" : "*Generated by widget*") : interaction.inviter)}`)
            .addField('Server King (Owner)',
            `${(client.guilds.cache.get(interaction.guild.id) !== undefined ? await interaction.guild.fetchOwner()
                .then((data) => {return data;})
                .catch((e) => {return "unable to locate King: " + e;})
                : "I'm not on the server")}`)
            .addField('Open invite',
            `[Web browser](${interaction.url}) ([API](https://discord.com/api/invite/${interaction.code}?with_counts=true&with_expiration=true));
            Splash screen: <discord://-/invite/${interaction.code}>;\nDirect Go To: <discord://discord.gg/${interaction.code}>;`)
            .addField(`Is this bot presense on server?`, `${(client.guilds.cache.get(interaction.guild.id) !== undefined ? "yes" : "no")}`, true)
            .addField(`And can lookup invites here?`,
            `${(
                interaction.guild.me !== undefined ?
                    (interaction.guild.me.permissions.has([Permissions.FLAGS.MANAGE_GUILD, Permissions.FLAGS.MANAGE_CHANNELS]) ?
                        "yes" : "no") :
                    "I'm not on the server"
            )}`, true)
            .addField(`And can create new?`,
            `${(
                interaction.guild.me !== undefined ?
                    (interaction.guild.me.permissions.has([Permissions.FLAGS.MANAGE_GUILD, Permissions.FLAGS.MANAGE_CHANNELS, Permissions.FLAGS.CREATE_INSTANT_INVITE]) ?
                        "yes" : "no") :
                    "I'm not on the server"
            )}`, true);


        return client.channels.cache.get(process.env.MASTER_CHX_DEBUG_LOG).send({ embeds: [eventEmbed] });
    }
}
