export default {
  name: 'interactionCreate',
  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    // Cooldown
    const cooldowns = client.cooldowns || new Map();
    client.cooldowns = cooldowns;

    const now = Date.now();
    const cooldownAmount = 3000; // 3s
    const timestamps = cooldowns.get(command.data.name) || new Map();

    const userCooldown = timestamps.get(interaction.user.id);
    if (userCooldown && now < userCooldown + cooldownAmount) {
      return interaction.reply({ content: '⏳ Calma aí, espera o cooldown.', ephemeral: true });
    }

    timestamps.set(interaction.user.id, now);
    cooldowns.set(command.data.name, timestamps);

    try {
      await command.execute(interaction, client);
    } catch (err) {
      console.error(err);
      await interaction.reply({ content: '❌ Erro ao executar comando.', ephemeral: true });
    }
  }
};
