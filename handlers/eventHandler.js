import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export async function loadEvents(client) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const eventsPath = path.join(__dirname, '../events');

  for (const file of fs.readdirSync(eventsPath).filter(f => f.endsWith('.js'))) {
    const event = await import(`../events/${file}`);
    if (event.default.once) {
      client.once(event.default.name, (...args) => event.default.execute(...args, client));
    } else {
      client.on(event.default.name, (...args) => event.default.execute(...args, client));
    }
  }
}
