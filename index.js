const Discord = require('discord.js');

const client = new Discord.Client();

const alive = require("./server");
//import { MessageEmbed } from 'discord.js';

const superagent=require('superagent');

const prefix = '-';

client.on("ready", ()=>{
  console.log('Logged in as ${client.user.tag}!');
});

client.on('message', async message =>{

    if(message.author.bot)
    {
        return;
    }
    if(!message.content.toLowerCase().startsWith(prefix))
    {
        return;
    }

    let args = message.content.slice(prefix.length).trim().split(/ +/g);

    let cmd=args.shift().toLowerCase();

    if(cmd==="search")
    {
        let query = args.join(" ");

        if(!query)
        {
            return message.reply("Missing query");
        }

        let result = await superagent.get("https://customsearch.googleapis.com/customsearch/v1").query({q: query, cx: "d85b453a6dda3f5a1", key: "AIzaSyB4A7sCLtLdo5yxCRum1HDMbH7KNt5GqSo"});

        if(!result.body.items)
        {
            return message.reply("I could not find anything!");
        }
        if(result.status >=500)
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

