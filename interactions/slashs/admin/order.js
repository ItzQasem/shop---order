const { SlashCommandBuilder } = require("@discordjs/builders");
const discord = require("discord.js");
let config = require("../../../jsons/config.json");

module.exports = {
  staff: true,
  data: new SlashCommandBuilder()
    .setName("orders-panel")
    .setDescription("send panel with buttons for order")
    .addChannelOption((op) =>
      op.setName("channel").setDescription("mention or id").setRequired(false)
    )
    .addAttachmentOption((op) =>
      op.setName("image").setDescription("image").setRequired(false)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    if (!interaction.guild) return;
    await interaction.deferReply({ ephemeral: true });
    let channel =
      interaction.options.getChannel("channel") ?? interaction.channel;
    let image = interaction.options.getAttachment("image");
    let embed = new discord.MessageEmbed().setTitle("طلبات")
      .setDescription(`ما هو نوع طلبك؟

    لطلب منتجات مثل :
    
    حسابات ، نيترو ، فيزا ، العاب ، طرق.. إلخ ، الرجاء الضغط على منتجات
    
    لطلب تصاميم مثل :
    
    صور سيرفر ، افتار ، بنر ، لوقو قناة... إلخ ، الرجاء الضغط على تصاميم
    
    لطلب برمجيات مثل :
    
    بروجكتات ، مواقع ، برمجة ، حل ايرورات ، صنع اكواد
    
    الرجاء الضغط على برمجيات`)
    .setColor('AQUA')
    if (image) {
      embed.setImage(image.url);
    }
    let row = new discord.MessageActionRow().addComponents(
      new discord.MessageButton()
        .setCustomId("products")
        .setStyle("PRIMARY")
        .setLabel("منتجات"),
      new discord.MessageButton()
        .setCustomId("devs")
        .setStyle("PRIMARY")
        .setLabel("برمجيات"),
      new discord.MessageButton()
        .setCustomId("design")
        .setStyle("PRIMARY")
        .setLabel("تصاميم")
    );
    if (channel.isText()) {
      channel.send({ embeds: [embed], components: [row] });
      interaction.editReply({ content: "تم ارسال البانل بنجاح ✅" });
    } else {
      interaction.editReply({ content: "مشكلة في الارسال" });
    }
  },
};
