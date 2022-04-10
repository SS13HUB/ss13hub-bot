
/*
    Warning: This event only triggers if the client has MANAGE_GUILD permissions for the guild, or MANAGE_CHANNELS permissions for the channel.
    https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-inviteCreate
*/

const chalkMy = require("./../../src/chalk");

module.exports = {
    name: 'inviteDelete',

    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        console.log(chalkMy.event, `Event fired: "inviteDelete" (${interaction})`);
        return client.channels.cache.get(process.env.LOG_CHANNEL_ID).send({ content: `inviteDelete event fired`});
    }
}
