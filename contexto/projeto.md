# Vibre Higgsfield

## Objetivo

Construir em conjunto um aplicativo que use a API da Higgsfield para criar vídeos destinados ao TikTok.

## Decisões confirmadas

- Iniciar o repositório do zero.
- Usar React, TypeScript, Vite e npm.
- Separar materiais de referência em `referencias/` e decisões em `contexto/`.
- Manter a autenticação Higgsfield somente no servidor; o navegador nunca recebe `HF_CREDENTIALS`.
- Primeiro teste solicitado: Seedance 2.5, texto para vídeo, 5 segundos, 720p e 16:9. Esse teste usa a proporção solicitada, apesar do destino futuro ser TikTok.
- Não registrar credenciais nas referências, no contexto ou no Git.
- Avançar devagar e confirmar com o usuário antes de cada nova geração paga, conforme pedido para economizar durante a primeira animação.

## Estado atual

- Base React + TypeScript criada a partir do template oficial do Vite.
- SDK oficial `@higgsfield/client@0.2.6` instalado; importação servidor e disponibilidade de `subscribe` verificadas. O SDK não é importado pelo frontend.
- `npm ci` executado para validar a instalação pelo lockfile; análise de código, verificação de tipos e build passaram. O servidor respondeu à página e aos módulos React durante a validação local.
- Autenticação e leitura do repositório GitHub verificadas; o repositório começou sem commits.
- As duas documentações oficiais foram consultadas antes da implementação. A página do modelo redireciona de `console.higgsfield.ai` para `open.higgsfield.ai` e agora está acessível.
- Domínios `docs.higgsfield.ai`, `console.higgsfield.ai`, `open.higgsfield.ai` e `api.higgsfield.ai` estão no rascunho da configuração. Uma consulta não autenticada à raiz da API retornou HTTP 405; isso confirma uma resposta do destino, sem validar autenticação ou acesso ao modelo.
- Exemplo servidor `index.ts` implementado com `subscribe`, polling, os parâmetros solicitados e tratamento de resultados sem sucesso. A URL é exibida somente para uma resposta concluída e validada. O POST não é repetido automaticamente.
- 13 testes locais com respostas simuladas passaram, além de lint e build com verificação de tipos. Esses testes não criam vídeos nem validam a conta Higgsfield.
- A primeira execução de `npm run generate:example` parou com código 1 antes da requisição por ausência de `HF_CREDENTIALS`. Depois foi encontrada a variável preenchida no `.env.example` remoto; seu valor foi transferido em tempo de execução para o arquivo privado `.env.local`, ignorado pelo Git e com permissão `600`, sem exibição da chave. O exemplo público foi limpo antes de um novo commit.
- A chave já havia sido publicada pelo commit remoto anterior e permanece no histórico público. A substituição foi recomendada; o usuário havia pedido para manter a chave por enquanto. Não exibir versões históricas do arquivo que contenham a credencial.
- A geração paga real foi então executada: o script confirmou `completed`, retornou uma URL HTTPS de vídeo e terminou com código 0. [Parâmetros e resultado](../referencias/geracao-seedance-exemplo.md).
- A credencial funciona por carregamento do arquivo local privado; isso não preenche um vínculo de segredo nas configurações da plataforma. Restauração do arquivo e execução em uma nova tarefa ainda não foram verificadas.
- `install_script` e `start_skill` salvos no rascunho do ambiente; publicação e restauração em uma nova tarefa não foram verificadas.
- Primeiro envio do README ao GitHub na branch `main`, no commit `c860b47ba6994d767f36df4aa9cde01c192826b3` (`first commit`). O conteúdo inicial já existente no remoto foi preservado. Apenas o README foi enviado naquele primeiro passo.
- O usuário autorizou em seguida a inclusão da base React/TypeScript, dependências com lockfile, documentação, referências e contexto no Git. `.env.local`, `node_modules/` e `dist/` ficam fora dos commits.

## Próximos passos

A [primeira animação Genjutsu](genjutsu.md) foi concluída usando duas solicitações de geração, além do teste inicial. Reutilizar os arquivos existentes e aguardar confirmação antes de gastar com outra geração.

1. Evoluir a interface e o fluxo de vídeos para TikTok conforme novas referências forem recebidas; a geração atual é um exemplo de CLI no servidor, ainda sem botão de geração no frontend.
2. Manter os registros de referências e contexto atualizados, sem valores de credenciais.
3. Reutilizar o ambiente conforme as instruções salvas; novas gerações pagas precisam de solicitação do usuário e não fazem parte da inicialização automática.
4. Substituir a credencial exposta quando o usuário autorizar; não reescrever o histórico remoto nem revogar a chave sem essa autorização.
