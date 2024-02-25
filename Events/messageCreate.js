const config = require("../jsons/config.json");
const { Client, Message } = require("discord.js");

module.exports = {
  name: "messageCreate",
  on: true,
  /**
   * @param {Client} client
   * @param {Message} message
   */
  async execute(client, message) {
    const line = config.line;
    // if (!line) return message.reply({ content: 'رابط الخط غير موجود !!' });

    const channels = config.autolinechannel;
    if (channels.includes(message.channel.id) && !message.author.bot) {
      try {
        await message.channel.send({ files: [line] });
      } catch (error) {
        console.error(`Error sending file: ${error.message}`);
      }
    }
  },
};
