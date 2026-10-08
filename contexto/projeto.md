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
- Documentação oficial do SDK consultada. A página oficial do modelo redireciona de `console.higgsfield.ai` para `open.higgsfield.ai`, cujo acesso ainda estava bloqueado na última tentativa.
- Domínios `docs.higgsfield.ai`, `console.higgsfield.ai`, `open.higgsfield.ai` e `api.higgsfield.ai` adicionados ao rascunho da configuração. O novo domínio de redirecionamento ainda precisa ser aplicado ao ambiente.
- Credencial não estava presente no processo nem em `.env.local` na verificação inicial. Deve ser inserida pelo usuário no arquivo local ou nas configurações seguras.
- Nenhuma geração real foi executada ou validada.
- `install_script` e `start_skill` salvos no rascunho do ambiente; publicação e restauração em uma nova tarefa não foram verificadas.
- Primeiro envio do README ao GitHub na branch `main`, no commit `c860b47ba6994d767f36df4aa9cde01c192826b3` (`first commit`). O conteúdo inicial já existente no remoto foi preservado. Apenas o README foi enviado naquele primeiro passo.
- O usuário autorizou em seguida a inclusão da base React/TypeScript, dependências com lockfile, documentação, referências e contexto no Git. `.env.local`, `node_modules/` e `dist/` ficam fora dos commits.

## Próximos passos

1. Consultar a página oficial do modelo na [referência Higgsfield](../referencias/higgsfield.md); a documentação do SDK já foi lida.
2. Implementar o exemplo servidor `index.ts` com o SDK oficial e os parâmetros confirmados.
3. Executar uma geração autorizada quando a credencial e o acesso à API estiverem disponíveis.
4. Registrar separadamente a validação da base web e a validação da geração real.
5. Evoluir a interface e o fluxo de vídeos para TikTok conforme novas referências forem recebidas.
