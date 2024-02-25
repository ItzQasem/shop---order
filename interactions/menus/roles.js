const discord = require("discord.js");
let config = require("../../jsons/config.json");
module.exports = {
 staff: true,
 menu: "roles",
  /**
   * @param {discord.Client} client
   * @param {discord.SelectMenuInteraction} interaction
   */
  async execute(client, interaction) {
    const value = interaction.values;
    const getUserIDformFooter = interaction.message.embeds[0].footer.text
    const user = interaction.guild.members.cache.get(getUserIDformFooter)

    let embed = new discord.MessageEmbed()
      .setColor("845865");

    for (let i = 0; i < config.roles.length; i++) {
      if (value[0] == config.roles[i]) {
        const role = interaction.guild.roles.cache.get(value[0]);

        if (role && user.roles.cache.has(role.id)) {
            user.roles.remove(role.id);
          embed.setDescription(`العضو: ${user}\n الاجراء: ازاله\n الرتبة: ${role}`)
          embed.setColor("RED")
          interaction.message.delete()
          interaction.channel.send({embeds: [embed]})
        } else {
          user.roles.add(role.id);
          embed.setDescription(`العضو: ${user}\n الاجراء: اعطاء\n الرتبة: ${role}`)
          embed.setColor("GREEN")
          interaction.message.delete()
          interaction.channel.send({embeds: [embed]})
        }
      }
    }
  },
};
