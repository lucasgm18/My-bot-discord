import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Responde com pong');

export async function execute(interaction) {
  await interaction.reply('🏓 Pong!');
}
// This command responds with "Pong!" when the user invokes the /ping command in Discord.