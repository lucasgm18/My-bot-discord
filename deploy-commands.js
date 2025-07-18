// deploy-commands.js
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { REST, Routes } from 'discord.js';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const commands = [];

const commandsFolder = path.join(__dirname, 'commands');
for (const folder of fs.readdirSync(commandsFolder)) {
  const folderPath = path.join(commandsFolder, folder);
  const commandFiles = fs.readdirSync(folderPath).filter(f => f.endsWith('.js'));
  for (const file of commandFiles) {
    const { data } = await import(`./commands/${folder}/${file}`);
    commands.push(data.toJSON());
  }
}

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

await rest.put(
  Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
  { body: commands }
);
console.log('✅ Slash commands atualizados');
console.log(`Total de comandos registrados: ${commands.length}`);
console.log('Comandos:', commands.map(cmd => cmd.name).join(', '));
console.log('Pronto!'); // Indica que o script foi executado com sucesso
console.log('Certifique-se de que o bot está online e conectado ao servidor para que os comandos funcionem corretamente.');
// Certifique-se de que o bot está online e conectado ao servidor para que os comandos funcionem corretamente.                      
// Você pode verificar se os comandos foram registrados corretamente usando o comando /help no Discord. 
// Se os comandos não aparecerem, verifique se o bot está online e se o token e IDs estão corretos.
// Se você estiver usando um banco de dados, certifique-se de que a conexão está funcionando        