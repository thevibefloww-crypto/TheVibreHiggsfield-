# TheVibreHiggsfield-

criação de video

Base de um aplicativo para criar vídeos destinados ao TikTok usando a API Higgsfield. Frontend em React + TypeScript + Vite; dependências gerenciadas com npm.

## Desenvolvimento

Use Node.js 24.19.0 ou superior; a versão do ambiente está registrada em `.node-version`.

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
npm test
```

`build` verifica os tipos TypeScript e gera o frontend em `dist/`. A interface ainda é a base inicial do Vite; o fluxo de criação de vídeos será desenvolvido nas próximas etapas.

## Credencial Higgsfield

O SDK oficial `@higgsfield/client` está instalado para uso **somente no servidor**, pelo módulo `@higgsfield/client/v2`. Nunca importe o SDK em `src/` nem use uma variável `VITE_` para a credencial.

O arquivo privado `.env.local` foi criado com `HF_CREDENTIALS` vazio. Abra esse arquivo localmente e preencha a variável no formato `key-id:key-secret`. Não envie a chave no chat, não a coloque nesta documentação e não a adicione ao Git. `.env.example` documenta apenas o nome da variável.

Node.js possui carregamento nativo de arquivos de ambiente; não é necessário instalar um loader adicional. O comando do exemplo carrega `.env.local` em tempo de execução sem exibir o valor da chave. Uma variável já configurada no processo tem precedência sobre o arquivo.

## Exemplo Seedance 2.5

O exemplo servidor está em [`index.ts`](index.ts). Execute na raiz do projeto:

```sh
npm run generate:example
```

**Essa execução envia uma geração paga quando a credencial está disponível.** O exemplo usa `subscribe` do SDK oficial com `withPolling: true`, modelo `bytedance/seedance-2.5/text-to-video`, prompt `A cinematic scene at sunset`, duração de 5 segundos, resolução `720p` e proporção `16:9`.

Apenas uma resposta `completed` com URL HTTPS de vídeo válida é exibida como sucesso. Falhas, cancelamentos, moderação, respostas incompletas e erros produzem saída de erro e código de saída 1; os objetos brutos de erro do SDK não são impressos. Repetições automáticas do POST estão desabilitadas para evitar outra cobrança após uma falha de rede ambígua.

A versão 0.2.6 do SDK encerra o polling automático em `completed`, `failed` ou `nsfw`; um cancelamento que não seja devolvido como resultado pode terminar pelo limite de espera de 10 minutos. Nesse caso, o comando falha sem afirmar sucesso. Confira a requisição no painel antes de executar uma nova geração.

Os testes em [`server/seedance.test.ts`](server/seedance.test.ts) usam respostas simuladas, sem chamadas à API nem cobranças. Eles não validam uma geração real.

## Estado da integração

- Instalação e importação do SDK verificadas.
- Documentação oficial do SDK consultada em `https://docs.higgsfield.ai/docs/how-to/sdk`. Ela confirma `@higgsfield/client/v2`, `HF_CREDENTIALS`, `subscribe`, `withPolling: true` e a resposta com `status`.
- A página oficial do modelo foi consultada após o redirecionamento de `console.higgsfield.ai` para `open.higgsfield.ai`; modelo, parâmetros e campo de resposta `video` foram confirmados. Os quatro domínios necessários estão no rascunho do ambiente: `docs.higgsfield.ai`, `console.higgsfield.ai`, `open.higgsfield.ai` e `api.higgsfield.ai`.
- Exemplo `index.ts` implementado. Os 13 testes locais, lint e build com verificação de tipos passaram. Credencial e SDK estão fora do código e do build do navegador.
- `npm run generate:example` foi executado, mas terminou com código 1 por ausência de `HF_CREDENTIALS`, antes de enviar qualquer requisição. A configuração segura ainda não tinha valor vinculado na última verificação.
- Nenhuma geração paga foi feita e nenhuma URL de vídeo foi obtida. A integração real com Seedance 2.5 continua sem validação.

Quando uma credencial estiver disponível pelo arquivo local ou por um vínculo seguro compatível com o SDK, executar o exemplo autorizado e confirmar a conclusão e a URL de vídeo. Não trocar o modelo silenciosamente se a conta não tiver acesso ao identificador solicitado.

## Referências e contexto

- [`referencias/`](referencias/README.md): materiais, links e exemplos enviados para orientar o produto.
- [`contexto/`](contexto/README.md): decisões, requisitos e pendências para continuar o trabalho entre sessões.

Os registros contêm os requisitos iniciais da Higgsfield sem incluir credenciais.
