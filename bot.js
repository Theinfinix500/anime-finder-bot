const Discord = require('discord.js');
const client = new Discord.Client();
require("dotenv").config(); 

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
      msg.channel.send("https://tenor.com/view/kot-cat-cat-dab-kot-dab-dancing-cat-gif-16155739");
    // msg.reply('https://tenor.com/view/kot-cat-cat-dab-kot-dab-dancing-cat-gif-16155739');
  }
});

client.login(process.env.BOT_TOKEN);