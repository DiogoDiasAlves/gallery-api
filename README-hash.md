# Scripts para Hash de Senha

Este projeto contém scripts para gerar hash de senhas usando bcrypt, seguindo a mesma lógica do AuthService.

## Scripts Disponíveis

### 1. `generate-hash.js` - Script Simples
Gera hash de uma senha fornecida via linha de comando.

**Uso:**
```bash
node generate-hash.js <senha>
```

**Exemplo:**
```bash
node generate-hash.js minhaSenha123
```

**Saída:**
```
=== Hash Gerado ===
Senha: minhaSenha123
Hash: $2b$10$abcdefghijklmnopqrstuvwxyz1234567890

=== Teste de Verificação ===
Hash válido: ✅ Sim
```

### 2. `hash-password.js` - Script Completo
Script mais completo com funções reutilizáveis e exemplos.

**Uso:**
```bash
node hash-password.js
```

## Como Funciona

Os scripts usam a mesma lógica do AuthService:

1. **Geração de Hash:** `bcrypt.hash(password, 10)`
   - Usa 10 salt rounds (padrão recomendado)
   - Gera um hash único para cada senha

2. **Verificação:** `bcrypt.compare(password, hashedPassword)`
   - Compara a senha original com o hash
   - Retorna `true` se a senha estiver correta

## Exemplo de Uso no Código

```javascript
// Gerar hash (para salvar no banco)
const hashedPassword = await bcrypt.hash('minhaSenha', 10);

// Verificar senha (para login)
const isValid = await bcrypt.compare('minhaSenha', hashedPassword);
```

## Dependências

Certifique-se de ter o bcrypt instalado:
```bash
npm install bcrypt
```

## Notas

- O hash gerado é único para cada senha, mesmo que a senha seja a mesma
- O bcrypt automaticamente inclui o salt no hash gerado
- Use sempre `bcrypt.compare()` para verificar senhas, nunca compare os hashes diretamente
