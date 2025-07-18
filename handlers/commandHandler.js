import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export async function loadCommands(client) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const commandsPath = path.join(__dirname, '../commands');

  for (const folder of fs.readdirSync(commandsPath)) {
    const commandFiles = fs.readdirSync(path.join(commandsPath, folder)).filter(f => f.endsWith('.js'));
    for (const file of commandFiles) {
      const command = await import(`../commands/${folder}/${file}`);
      client.commands.set(command.data.name, command);
    }
  }
}
