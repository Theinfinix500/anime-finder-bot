const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
require("dotenv").config();
const axios = require('axios');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content.startsWith('!afind')) {
    const animeToSearch = msg.content.substr(7);
    console.log(animeToSearch);
    if (!animeToSearch) {
      msg.reply('You forgot to tell me the anime name')
      
      return;
    }

    axios.get(`https://api.jikan.moe/v3/search/anime?q=${animeToSearch}&page=1&limit=1`)
      .then(function (response) {
        const startDate = new Date(response.data.results[0].start_date);
        const endDate = new Date(response.data.results[0].end_date);

        let monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format;
        const startDateFormatted = `${startDate.getDate()} ${monthName(startDate)} ${startDate.getFullYear()}`;
        const endDateFormatted = `${endDate.getDate()} ${monthName(endDate)} ${endDate.getFullYear()}`;

        const embed = new MessageEmbed()
          .setTitle(response.data.results[0].title)
          .addField('Ep', response.data.results[0].episodes, true)
          .addField('Score', response.data.results[0].score, true)
          .addField('Type', response.data.results[0].type, true)
          .addField('Airing', response.data.results[0].airing ? 'YES' : 'NO', true)
          .addField('Started', startDateFormatted, true)
          .addField('Ended', endDateFormatted, true)
          .setColor(0xff0000)
          .setThumbnail(response.data.results[0].image_url)
          .setDescription(response.data.results[0].synopsis)
          .setURL(response.data.results[0].url)
        msg.channel.send(embed);
        console.log(response.data.results[0].image_url);
      })
      .catch(function (error) {
        console.log(error);
      })
  }
});

client.login(process.env.BOT_TOKEN);