const discord = require('discord.js')
let config = require("../../jsons/config.json");
module.exports = {
    btn: "claim",
    staff: true,
    /**
     * @param {discord.Client} client 
     * @param {discord.ButtonInteraction} interaction 
     * @param {discord.GuildChannel} channel 
     */
   async execute(client, interaction, channel) {
        interaction.channel.edit({
            permissionOverwrites: [
                {
                type: "member", 
                id: interaction.member.id,
                allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                },
                {
                type: "role", 
                id: config.staff_role_ID,
                deny: ["SEND_MESSAGES"]
                }
            ]
        })
        let embed = new discord.MessageEmbed()
          .setDescription(`تم استلام التذكرة من قبل ${interaction.member}`)
          .setFooter({text: interaction.user.id})
          .setColor('AQUA')
          let button = new discord.MessageButton()
          .setCustomId('disclaim')
          .setLabel('ترك')
          .setStyle('DANGER')
          let row = new discord.MessageActionRow()
          .addComponents(button)
        interaction.reply({content: `تم استلام التذكرة من قبل ${interaction.member}`})

        return interaction.message.edit({embeds: [embed], components: [row]})
    },
};