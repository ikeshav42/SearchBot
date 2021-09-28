const Discord = require('discord.js');

const client = new Discord.Client();

const alive = require("./server");
//import { MessageEmbed } from 'discord.js';

const superagent=require('superagent');

const prefix = '-';

client.on("ready", ()=>{
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildCreate', guild => {

  let channelEmbed = new Discord.MessageEmbed()
  .setColor('RANDOM')
  .setAuthor("WebSearch by sketch#2407")
  .setTitle('Thank you for inviting me!')
  .setDescription('Use -search followed by a query to see what i can do! \n Do -ping to see how quick I respond! \n My GitHub: https://github.com/ikeshav42')
  .setTimestamp()
  .setFooter("Have a good day!");

  
  guild.systemChannel.send(channelEmbed)
});

client.on('message', async message =>{

    if(message.author.bot)//if bot sends message
    {
        return;
    }
    if(!message.content.toLowerCase().startsWith(prefix))//if it does not start with prefix
    {
        return;
    }

    let args = message.content.slice(prefix.length).trim().split(/ +/g);//deal with spaces

    let cmd=args.shift().toLowerCase();

    if (cmd === 'ping') 
    {
    message.channel.send (`pong!`) 
    message.channel.send (`${client.ws.ping} ms`)
    }

    if(cmd==="search")
    {
        let query = args.join(" ");

        if(!query)// if no query
        {
            return message.reply("Missing query");
        }

        let result = await superagent.get("https://customsearch.googleapis.com/customsearch/v1").query({q: query, cx: "d85b453a6dda3f5a1", key: "AIzaSyB4A7sCLtLdo5yxCRum1HDMbH7KNt5GqSo"});

        if(!result.body.items)// if no search data found
        {
            return message.reply("I could not find anything!");
        }
        if(result.status >=500)//delay
        {
            return message.reply("Error!");
        }

        let res = result.body.items[0];

        const embed = new Discord.MessageEmbed()
        .setColor(0x7289DA)
        .setTitle(res.title)
        .setDescription(res.snippet)
        .setURL(res.link)
        .setImage(res.pagemap.cse_image[0].src);

        return message.reply(embed);
    }
})







alive()
const mySecret = process.env['TKN']

client.login(mySecret)

