const discord = require('discord.js')
let config = require("../../jsons/config.json")
module.exports = {
    btn: "design",
    /**
     * @param {discord.Client} client 
     * @param {discord.ButtonInteraction} interaction 
     */
   async execute(client, interaction) {
    if(!interaction.member.roles.cache.has(config.orders.required_role))return;
    
    let modal = new discord.Modal()
    .setCustomId("design")
    .setTitle("طلبات التصاميم")
    let productsInput = new discord.TextInputComponent()
      .setCustomId("design")
      .setLabel("اكتب الطلب هنا")
      .setMaxLength(4000)
      .setStyle("PARAGRAPH")
      .setRequired(true);
    const rows = new discord.MessageActionRow().addComponents(productsInput);
    modal.addComponents(rows)
    await interaction.showModal(modal)
    },
};