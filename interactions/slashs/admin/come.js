const { SlashCommandBuilder } = require("@discordjs/builders");
const discord = require("discord.js");
let config = require("../../../jsons/config.json")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("come")
    .setDescription("sent notification to someone to come")
    .addUserOption((op) =>
      op.setName("user").setDescription("mention or id").setRequired(true)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    if(!interaction.guild) return;
    if(!interaction.member.roles.cache.has(config.staff_role_ID)) return;
    await interaction.deferReply()
    let user = interaction.options.getUser("user");
    let member = interaction.guild.members.cache.get(user.id);
    let channel = interaction.channel;
      member.send({embeds: [new discord.MessageEmbed()
    .setAuthor(interaction.user.username, interaction.user.displayAvatarURL({dynamic: true}))
    .setDescription(`ينادومك ب ${channel}`)
    .setColor("AQUA")
]}).catch(e => {
    interaction.editReply({content: 'لم اتمكن من ارسال النداء المستخدم غالق الخاص'})
})
      interaction.editReply(`تم ارسال النداء الى ${user}`);

  },
};
