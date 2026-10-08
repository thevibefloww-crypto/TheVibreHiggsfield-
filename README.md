# TheVibreHiggsfield-

criação de video

Base de um aplicativo para criar vídeos destinados ao TikTok usando a API Higgsfield. Frontend em React + TypeScript + Vite; dependências gerenciadas com npm.

## Desenvolvimento

Use Node.js 24 ou superior; a versão do ambiente está registrada em `.node-version`.

```sh
npm ci
npm run dev
```

No ambiente cloud, direcione o cache do npm para uma pasta gravável antes de executar os comandos:

```sh
export npm_config_cache=/workspace/.cache/npm
```

Validações disponíveis:

```sh
npm run lint
npm run build
```

`build` verifica os tipos TypeScript e gera o frontend em `dist/`. A interface ainda é a base inicial do Vite; o fluxo de criação de vídeos será desenvolvido nas próximas etapas.

## Credencial Higgsfield

O SDK oficial `@higgsfield/client` está instalado para uso **somente no servidor**, pelo módulo `@higgsfield/client/v2`. Nunca importe o SDK em `src/` nem use uma variável `VITE_` para a credencial.

O arquivo privado `.env.local` foi criado com `HF_CREDENTIALS` vazio. Abra esse arquivo localmente e preencha a variável no formato `key-id:key-secret`. Não envie a chave no chat, não a coloque nesta documentação e não a adicione ao Git. `.env.example` documenta apenas o nome da variável.

Node.js 24 possui carregamento nativo de arquivos de ambiente, por exemplo `node --env-file-if-exists=.env.local arquivo-servidor.ts`; não é necessário instalar um loader adicional. O runtime pode carregar a chave sem exibir seu valor.

## Estado da integração

- Instalação e importação do SDK verificadas.
- Acesso às duas documentações oficiais bloqueado pela política de rede na última tentativa. Os domínios necessários foram salvos no rascunho do ambiente: `docs.higgsfield.ai`, `console.higgsfield.ai` e `api.higgsfield.ai`.
- O exemplo `index.ts` ainda não foi implementado: as páginas oficiais devem ser consultadas antes, conforme solicitado.
- Não foi executada nenhuma geração paga e não foi obtida uma URL de vídeo. A integração com Seedance 2.5 ainda não está validada.

Após liberar a rede e preencher a credencial localmente, consultar a documentação, confirmar o modelo e seus parâmetros, implementar `subscribe` e executar a geração autorizada. Não trocar o modelo silenciosamente caso o identificador solicitado não esteja disponível.

## Referências e contexto

- [`referencias/`](referencias/README.md): materiais, links e exemplos enviados para orientar o produto.
- [`contexto/`](contexto/README.md): decisões, requisitos e pendências para continuar o trabalho entre sessões.

Os registros contêm os requisitos iniciais da Higgsfield sem incluir credenciais.
