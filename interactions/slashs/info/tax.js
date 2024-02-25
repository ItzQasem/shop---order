const { SlashCommandBuilder } = require("@discordjs/builders");
const discord = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tax")
    .setDescription("calucate tax")
    .addStringOption((op) =>
      op.setName("number").setDescription("number for tax").setRequired(true)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    let number = interaction.options.getString("number");
    let args2 = number
      .replace("k", "000")
      .replace("K", "000")
      .replace("m", "000000")
      .replace("M", "000000")
      .replace("b", "000000000000")
      .replace("B", "000000000000");

    const tax = Math.floor((args2 * 20) / 19 + 1);
    const tax2 = Math.floor((args2 * 20) / 19 + 1 - args2);
    const tax3 = Math.floor((args2 * 20) / 20);
    if (
      !number.endsWith("k") &&
      !number.endsWith("K") &&
      !number.endsWith("m") &&
      !number.endsWith("M") &&
      !number.endsWith("b") &&
      !number.endsWith("B") &&
      isNaN(number)
    ) {
      return interaction.reply("ضع مبلغ صحيح لحساب ضريبته!");
    }
    interaction.reply(
      `**> 💳 المبلغ بدون ضريبه : ${args2}\n> 💵 الضريبه الي ياخذها البوت : ${tax2}\n> 💰 المبلغ مع الضريبه : ${tax}**`
    );
  },
};
