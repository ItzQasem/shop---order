const { SlashCommandBuilder } = require("@discordjs/builders");
const discord = require("discord.js");
let config = require("../../../jsons/config.json");

module.exports = {
  staff: true,
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("give warn to someone")
    .addUserOption((op) =>
      op
        .setName("user")
        .setDescription("user to warn")
        .setRequired(true))
    .addStringOption((op) =>
    op
      .setName("reason")
      .setDescription("why you warned him?")
      .setRequired(false)
  ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    if (!interaction.guild) return;
    let user = interaction.options.getUser("user")
    let member = interaction.guild.members.cache.get(user.id)
    if(member.user.bot)return interaction.reply({content: 'لا يمكنك تحذير البوتات'})
    if(member.id === interaction.member.id) return interaction.reply({content: 'انت غبي ؟'})
    let reason = interaction.options.getString("reason") ?? "no reason provided";
    let roles = config.warn.warn_roles;
    let sell_roles = config.warn.sell_roles;
    let embed = new discord.MessageEmbed()
      .setTitle(`تحذير منشور !`)
      //العضو: ${member}\n الادراي: ${interaction.member}\n السبب: ${reason}\n التحذير: ${}
      .setColor("RANDOM")
      .setFooter({text: member.id})
      let warn1 = interaction.guild.roles.cache.get(roles[0])
      let warn2 = interaction.guild.roles.cache.get(roles[1])
      let warn3 = interaction.guild.roles.cache.get(roles[2])
    if(!member.roles.cache.has(roles[0])){
        embed.setDescription(`العضو: ${member}\n الادراي: ${interaction.member}\n السبب: ${reason}\n التحذير: ${warn1.name}`)
        member.roles.add(warn1.id)
    } else if(member.roles.cache.has(roles[0] ) && !member.roles.cache.has(roles[1])){
        embed.setDescription(`العضو: ${member}\n الادراي: ${interaction.member}\n السبب: ${reason}\n التحذير: ${warn2.name}`)
        member.roles.add(warn2.id)
    } else if(member.roles.cache.has(roles[0] ) && member.roles.cache.has(roles[1]) && !member.roles.cache.has(roles[2])){
        embed.setDescription(`العضو: ${member}\n الادراي: ${interaction.member}\n السبب: ${reason}\n التحذير: ${warn3.name}`)
        member.roles.add(warn3.id)
    } else {
        embed.setDescription(`العضو: ${member}\n الادراي: ${interaction.member}\n السبب: ${reason}\n التحذير: سحب رتبة`)
        member.roles.remove([warn1.id, warn2.id, warn3.id])
        for(const roleId of sell_roles){
            const role = interaction.guild.roles.cache.get(roleId)
            if(role && member.roles.cache.has(role.id)){
                member.roles.remove(role.id)
            }
        }
    }
    interaction.reply({embeds: [embed]})
  },
};
