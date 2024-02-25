const discord = require('discord.js')
let config = require("../../jsons/config.json")
module.exports = {
    btn: "delete-order",
    /**
     * @param {discord.Client} client 
     * @param {discord.ButtonInteraction} interaction 
     */
   async execute(client, interaction) {
    if(!interaction.member.roles.cache.has(config.staff_role_ID))return;
    interaction.message.delete()
    },
};