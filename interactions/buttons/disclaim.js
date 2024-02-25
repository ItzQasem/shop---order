const discord = require("discord.js");
let config = require("../../jsons/config.json");
module.exports = {
  btn: "disclaim",
  staff: true,
  /**
   * @param {discord.Client} client
   * @param {discord.ButtonInteraction} interaction
   * @param {discord.GuildChannel} channel
   */
  async execute(client, interaction, channel) {
    let embed = new discord.MessageEmbed()
      .setDescription("لاستلام التكت اضغط على الزر ")
      .setColor("AQUA");
    let button = new discord.MessageButton()
      .setCustomId("claim")
      .setLabel("استلام")
      .setStyle("SUCCESS");
    let row = new discord.MessageActionRow().addComponents(button);
    let claimerID = interaction.message.embeds[0].footer.text;
    if (interaction.user.id != claimerID)
      return interaction.reply({
        content: "لم تستلم التذكره بعد!",
        ephemeral: true,
      });
    interaction.reply({
      content: `تم ترك التذكرة من قبل ${interaction.member}`,
    });
    interaction.channel.edit({
      permissionOverwrites: [
        {
          type: "member",
          id: interaction.member.id,
          allow: ["SEND_MESSAGES", "VIEW_CHANNEL"],
        },
        {
          type: "role",
          id: config.staff_role_ID,
          allow: ["SEND_MESSAGES"],
        },
      ],
    });
    return interaction.message.edit({ embeds: [embed], components: [row] });
  },
};
