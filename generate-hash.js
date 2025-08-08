const bcrypt = require('bcrypt');

// Pega a senha dos argumentos da linha de comando
const password = process.argv[2];

if (!password) {
  console.log('Uso: node generate-hash.js <senha>');
  console.log('Exemplo: node generate-hash.js minhaSenha123');
  process.exit(1);
}

async function generateHash() {
  try {
    // Gera o hash usando a mesma configuração do AuthService
    const hashedPassword = await bcrypt.hash(password, 10);
    
    console.log('\n=== Hash Gerado ===');
    console.log('Senha:', password);
    console.log('Hash:', hashedPassword);
    console.log('\n=== Teste de Verificação ===');
    
    // Testa se o hash funciona
    const isValid = await bcrypt.compare(password, hashedPassword);
    console.log('Hash válido:', isValid ? '✅ Sim' : '❌ Não');
    
  } catch (error) {
    console.error('Erro:', error.message);
  }
}

generateHash();
