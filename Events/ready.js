const {Client} = require("discord.js");
  module.exports = {
    name: "ready",
    once: true,
    /**
     * @param {Client} client
     */
    async execute(client) {
      return new Promise((resolve, reject) => {
        try {
          console.log(client.user.username, "Ready!");
          client.user.setPresence({activities: [{name: "Source v13", type: "WATCHING"}], status: "idle" })
          module.exports.id = client.user.id;
          resolve(client)
        } catch(error){
          reject(error);
        }
      })
    }
  };
  