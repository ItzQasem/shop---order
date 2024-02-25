const { SlashCommandBuilder } = require("@discordjs/builders");
const discord = require("discord.js");
let config = require("../../../jsons/config.json");

module.exports = {
  staff: true,
  data: new SlashCommandBuilder()
    .setName("roles")
    .setDescription("give someone roles")
    .addUserOption((op) =>
      op
        .setName("user")
        .setDescription("user to give him a role")
        .setRequired(false)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    if (!interaction.guild) return;
    let user = interaction.options.getUser("user") ?? interaction.user;
    let roles = config.roles;
    let embed = new discord.MessageEmbed()
      .setTitle(`اعطاء رتبة`)
      .setDescription(`اعطاء رتبة ل ${user}`)
      .setColor("845865")
      .setFooter({text: user.id})
    const select = new discord.MessageSelectMenu()
      .setCustomId("roles")
      .setPlaceholder("select roles");

    let row = new discord.MessageActionRow().addComponents(select);
    for (const roleId of roles) {
      const role = interaction.guild.roles.cache.get(roleId);
      select.addOptions({ label: role.name, value: role.id });
    }
    interaction.reply({ embeds: [embed], components: [row] });
  },
};
