const {Client, MessageEmbed, MessageButton, MessageActionRow} = require("discord.js");
const discord = require("discord.js");
let config = require("../jsons/config.json")
  module.exports = {
    name: "channelCreate",
    on: true,
    /**
     * @param {Client} client
     * @param {discord.TextChannel} channel
     */
    async execute(client, channel) {
        try {
          if(channel.parentId != config.categoryID) return;
          let embed = new MessageEmbed()
          .setDescription('لاستلام التكت اضغط على الزر ')
          .setColor('AQUA')
          let button = new MessageButton()
          .setCustomId('claim')
          .setLabel('استلام')
          .setStyle('SUCCESS')
          let row = new MessageActionRow()
          .addComponents(button)
          setTimeout(() => {
            channel.send({embeds: [embed], components: [row]})
          }, 2000)
        } catch(error){
            
        }
    }
  };
  