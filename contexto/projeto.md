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

## Estado atual

- Base React + TypeScript criada a partir do template oficial do Vite.
- SDK oficial `@higgsfield/client@0.2.6` instalado; importação servidor e disponibilidade de `subscribe` verificadas. O SDK não é importado pelo frontend.
- `npm ci` executado para validar a instalação pelo lockfile; análise de código, verificação de tipos e build passaram. O servidor respondeu à página e aos módulos React durante a validação local.
- Autenticação e leitura do repositório GitHub verificadas; o repositório começou sem commits.
- As duas documentações oficiais foram consultadas antes da implementação. A página do modelo redireciona de `console.higgsfield.ai` para `open.higgsfield.ai` e agora está acessível.
- Domínios `docs.higgsfield.ai`, `console.higgsfield.ai`, `open.higgsfield.ai` e `api.higgsfield.ai` estão no rascunho da configuração. Uma consulta não autenticada à raiz da API retornou HTTP 405; isso confirma uma resposta do destino, sem validar autenticação ou acesso ao modelo.
- Exemplo servidor `index.ts` implementado com `subscribe`, polling, os parâmetros solicitados e tratamento de resultados sem sucesso. A URL é exibida somente para uma resposta concluída e validada. O POST não é repetido automaticamente.
- 13 testes locais com respostas simuladas passaram, além de lint e build com verificação de tipos. Esses testes não criam vídeos nem validam a conta Higgsfield.
- O comando `npm run generate:example` foi executado, mas parou com código de saída 1 antes da requisição porque `HF_CREDENTIALS` continua ausente. O requisito existe nas configurações, ainda sem valor vinculado na última verificação. A credencial precisa ser disponibilizada pelo arquivo local ou por um vínculo seguro compatível.
- Nenhuma geração real foi executada ou validada.
- `install_script` e `start_skill` salvos no rascunho do ambiente; publicação e restauração em uma nova tarefa não foram verificadas.
- Primeiro envio do README ao GitHub na branch `main`, no commit `c860b47ba6994d767f36df4aa9cde01c192826b3` (`first commit`). O conteúdo inicial já existente no remoto foi preservado. Apenas o README foi enviado naquele primeiro passo.
- O usuário autorizou em seguida a inclusão da base React/TypeScript, dependências com lockfile, documentação, referências e contexto no Git. `.env.local`, `node_modules/` e `dist/` ficam fora dos commits.

## Próximos passos

1. Disponibilizar `HF_CREDENTIALS` por um meio seguro, sem registrar seu valor no chat, no contexto ou no Git.
2. Executar `npm run generate:example` para a geração paga já autorizada e confirmar a conclusão e a URL real.
3. Registrar o resultado real separadamente dos 13 testes locais e da validação da base web.
4. Evoluir a interface e o fluxo de vídeos para TikTok conforme novas referências forem recebidas.
