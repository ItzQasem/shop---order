const { SlashCommandBuilder } = require("@discordjs/builders");
const discord = require("discord.js");
let config = require("../../../jsons/config.json")

module.exports = {
  cooldown: 5000,
  data: new SlashCommandBuilder()
    .setName("check")
    .setDescription("check if someone is sus or not trusted")
    .addUserOption((op) =>
      op.setName("user").setDescription("mention or id").setRequired(true)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    if(!interaction.guild) return;
    await interaction.deferReply()
    let user = interaction.options.getUser("user");
    let member = interaction.guild.members.cache.get(user.id);
    if(!member) return interaction.editReply({content: 'العضو غير موجود داخل السيرفر'})
    if(interaction.member.roles.cache.has(config.suspect_role_ID)) {
         interaction.editReply(` نصاب ${user}`);
    } else {
        interaction.editReply(`ليس نصاب ${user}`);
    }
  },
};
