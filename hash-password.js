const bcrypt = require('bcrypt');

/**
 * Script para gerar hash de senhas usando bcrypt
 * Baseado na lógica do AuthService
 */

async function hashPassword(password) {
  try {
    // Gera o hash da senha com salt rounds de 10 (padrão recomendado)
    const hashedPassword = await bcrypt.hash(password, 10);
    
    console.log('Senha original:', password);
    console.log('Hash gerado:', hashedPassword);
    
    // Verifica se o hash está correto
    const isValid = await bcrypt.compare(password, hashedPassword);
    console.log('Hash válido:', isValid);
    
    return hashedPassword;
  } catch (error) {
    console.error('Erro ao gerar hash:', error);
    throw error;
  }
}

async function verifyPassword(password, hashedPassword) {
  try {
    const isValid = await bcrypt.compare(password, hashedPassword);
    console.log('Senha:', password);
    console.log('Hash:', hashedPassword);
    console.log('Senha válida:', isValid);
    return isValid;
  } catch (error) {
    console.error('Erro ao verificar senha:', error);
    throw error;
  }
}


async function main() {
  const senha = 'minhaSenha123';
  
  console.log('=== Gerando hash de senha ===');
  const hash = await hashPassword(senha);
  
  console.log('\n=== Verificando senha ===');
  await verifyPassword(senha, hash);
  
  console.log('\n=== Testando senha incorreta ===');
  await verifyPassword('senhaErrada', hash);
}


if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  hashPassword,
  verifyPassword
};
