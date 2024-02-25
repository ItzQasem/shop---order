const discord = require('discord.js')
let config = require("../../jsons/config.json")
module.exports = {
    name: "devs",
    /**
     * @param {discord.Client} client 
     * @param {discord.ModalMessageModalSubmitInteraction} interaction 
     */
    async execute(client, interaction) {
        
        await interaction.deferReply({ephemeral: true})
        let devsContent = interaction.fields.getTextInputValue("devs");
        let channel = interaction.guild.channels.cache.get(config.orders.devs_channel)
        let line = config.line
        let embed = new discord.MessageEmbed()
        .setAuthor(interaction.member.user.username+" "+ `(${interaction.member.id})`, interaction.member.displayAvatarURL({dynamic: true}))
        .setDescription(`${devsContent}`)
        .setColor("BLUE")
        .setTimestamp()
        .setFooter(client.user.username, client.user.displayAvatarURL({dynamic: true}))
        let row = new discord.MessageActionRow()
          .addComponents(
            new discord.MessageButton()
          .setCustomId('delete-order')
          .setLabel('حذف الطلب')
          .setStyle('DANGER'))
        channel.send({content: `<@&${config.orders.design_role}> طلب جديد` , embeds: [embed], components: [row]}).then(() => {
        channel.send({files: [line]})
        })
        interaction.editReply({content: `تم ارسال طلبك بنجاح ✅` })
        
    },
};