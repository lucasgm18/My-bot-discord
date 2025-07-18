import 'dotenv/config';
import { Client, GatewayIntentBits, Collection } from 'discord.js';
import { loadCommands } from './handlers/commandHandler.js';
import { loadEvents } from './handlers/eventHandler.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

await loadCommands(client);
await loadEvents(client);

client.login(process.env.DISCORD_TOKEN);
console.log('Bot is online!');