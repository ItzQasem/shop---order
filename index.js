require("dotenv").config();
const fs = require("fs");
const express = require("express");
const config = require("./jsons/config.json");

const discord = require("discord.js");
const client = new discord.Client({
  intents: 32767,
});
client.setMaxListeners(999_999_999);
client.SlashCommands = new discord.Collection();
client.buttons = new discord.Collection();
client.menus = new discord.Collection();
client.modals = new discord.Collection();
module.exports = client;

fs.readdirSync("express").forEach((ex) => {
  require(`./express/${ex}`)(express);
});
fs.readdirSync("Handlers").forEach((file) => {
  require(`./Handlers/${file}`)(client);
});
process.on("uncaughtExceptionMonitor", (err) => {
  return console.log(err);
});
process.on("unhandledRejection", (err) => {
  return console.log(err);
});
process.on("rejectionHandled", (err) => {
  return console.log(err);
});

client.login(process.env.token).catch((e) => console.log(e));
