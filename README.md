# Gallery API

API desenvolvida com NestJS para gerenciamento de uma galeria de fotos, incluindo autenticação de usuários, upload, listagem e deleção de imagens.

## Funcionalidades

- Autenticação de usuários via JWT
- Cadastro, atualização e deleção de usuários
- Upload de imagens
- Listagem de imagens (todas, por usuário, por id)
- Deleção de imagens
- Proteção de rotas com autenticação
- Documentação automática via Swagger (`/api`)

## Instalação

```bash
git clone https://github.com/SEU_USUARIO/gallery-api.git
cd gallery-api
npm install
```

## Configuração

1. Renomeie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente (ex: `DATABASE_URL`).
2. Configure o banco de dados PostgreSQL conforme o arquivo `prisma/schema.prisma`.
3. Execute as migrações do Prisma:
   ```bash
   npx prisma migrate dev
   ```

## Execução

```bash
npm run start:dev
```

A API estará disponível em `http://localhost:3333`.

## Endpoints principais

- `POST /auth/login` — Autenticação de usuário
- `GET /users` — Listar usuários
- `POST /users` — Criar usuário
- `PUT /users/:id` — Atualizar usuário
- `DELETE /users/:id` — Deletar usuário
- `GET /image` — Listar todas as imagens
- `GET /image/my-images` — Listar imagens do usuário autenticado
- `GET /image/:id` — Buscar imagem por id
- `POST /image` — Upload de imagem
- `DELETE /image/:id` — Deletar imagem

## Autenticação

A maioria dos endpoints requer autenticação via JWT.  
Inclua o token no header `Authorization`:

```
Authorization: Bearer <seu_token>
```

## Documentação Swagger

Acesse a documentação interativa em:  
`http://localhost:3333/api`

## Estrutura do Projeto

- `src/infra/http/controllers` — Controllers HTTP
- `src/infra/database/prisma/repository` — Repositórios Prisma
- `src/core/entities` — Entidades de domínio
- `src/domain/use-case` — Casos de uso
- `prisma/schema.prisma` — Modelo do banco de dados

## Licença

MIT
