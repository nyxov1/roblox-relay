const { Client, GatewayIntentBits } = require("discord.js");
const fetch = (...args) => import("node-fetch").then(({ default: f }) => f(...args));

const RELAY_URL = "https://roblox-relay-v4q1.onrender.com";
const PREFIX = "!";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on("ready", () => console.log("Bot online: " + client.user.tag));

client.on("messageCreate", async (msg) => {
    if (msg.author.bot) return;
    if (!msg.content.startsWith(PREFIX)) return;

    const content = msg.content.slice(PREFIX.length).trim();

    await fetch(RELAY_URL + "/command", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cmd: "!" + content })
    });

    msg.reply("✅ Sent: `!" + content + "`");
});

client.login(process.env.BOT_TOKEN);
