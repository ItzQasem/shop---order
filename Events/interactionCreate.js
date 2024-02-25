const {
  Client,
  CommandInteraction,
  AutocompleteInteraction,
  MessageAttachment,
  Collection
} = require("discord.js");
let delay = new Collection();
let ms = require("ms");
let config = require("../jsons/config.json")
module.exports = {
  name: "interactionCreate",
  on: true,
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  async execute(client, interaction) {
    if (interaction.isCommand()) {
      const command = client.SlashCommands.get(interaction.commandName);
      if (!command) return;
      try {
        if (command.cooldown) {
          if (delay.has(`${command.name}-${interaction.member.id}`))
            return interaction
              .reply(
                `You can use this command again after **${
                  ms(
                    delay.get(`${command.name}-${interaction.member.id}`) -
                      Date.now(),
                    { long: true }
                  ).includes("ms")
                    ? "0 second"
                    : ms(
                        delay.get(`${command.name}-${interaction.member.id}`) -
                          Date.now(),
                        { long: true }
                      )
                }**`
              )
              .then((sent) => setTimeout(() => sent.delete(), 5000));
          delay.set(
            `${command.name}-${interaction.member.id}`,
            Date.now() + command.cooldown
          );
          setTimeout(() => {
            delay.delete(`${command.name}-${interaction.member.id}`);
          }, command.cooldown);
        }
        await command.execute(client, interaction);
      } catch (e) {
        console.log(e);
        interaction.reply({
          content: `There is an error with executing this slashCommand!`,
          ephemeral: true,
        });
      }
    }
    if (interaction.isButton()) {
      const button = client.buttons.get(interaction.customId);
      if (!button) return;
      try {
        if (button.staff) {
          if (button.staff === true) {
            if(!interaction.member.roles.cache.has(config.staff_role_ID)) return interaction.reply({
              content: "هذا الزر للاداره فقط",
              ephemeral: true,
            });
          }
        }
        await button.execute(client, interaction);
      } catch (e) {
        console.log(e);
        interaction.reply({
          content: `There is an error with executing this button!`,
          ephemeral: true,
        });
      }
    }
    if (interaction.isSelectMenu()) {
      const menu = client.menus.get(interaction.customId);
      if (!menu) return;
      try {
        if (menu.staff) {
          if (menu.staff === true) {
            if(!interaction.member.roles.cache.has(config.staff_role_ID)) return interaction.reply({
              content: "هذا للاداره فقط",
              ephemeral: true,
            });
          }
        }
        await menu.execute(client, interaction);
      } catch (e) {
        console.log(e);
        interaction.reply({
          content: `There is an error with executing this menu!`,
          ephemeral: true,
        });
      }
    }
    if (interaction.isModalSubmit()) {
      const modal = client.modals.get(interaction.customId);
      if (!modal) return;
      try {
        await modal.execute(client, interaction);
      } catch (e) {
        console.log(e);
        interaction.reply({
          content: `There is an error with executing this modal!`,
          ephemeral: true,
        });
      }
    }
  },
};
