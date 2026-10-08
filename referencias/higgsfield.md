# Higgsfield e Seedance 2.5

Referência inicial recebida em 8 de outubro de 2026.

## Fontes oficiais solicitadas

- SDK: https://docs.higgsfield.ai/docs/how-to/sdk
- Modelo: https://console.higgsfield.ai/models/bytedance/seedance-2.5/text-to-video/api-reference
- SDK TypeScript oficial: https://github.com/higgsfield-ai/higgsfield-js

## Requisitos do primeiro exemplo

- Linguagem TypeScript e gerenciador npm.
- SDK `@higgsfield/client`, executado somente no servidor.
- Credencial `HF_CREDENTIALS`, carregada em tempo de execução de `.env.local` ou do ambiente seguro, no formato `key-id:key-secret`.
- Método `subscribe`, aguardando conclusão.
- Modelo solicitado: `bytedance/seedance-2.5/text-to-video`.
- Prompt: `A cinematic scene at sunset`.
- Duração: 5 segundos; resolução: `720p`; proporção: `16:9`.
- Retornar a URL do vídeo apenas quando a geração estiver concluída.
- Tratar falha, cancelamento e moderação como resultados sem sucesso.
- A execução real de uma geração paga foi autorizada pelo usuário.

## Consulta das fontes

A documentação oficial do SDK foi consultada em 8 de outubro de 2026. Ela confirma a importação `config` e `higgsfield` de `@higgsfield/client/v2`, autenticação servidor por `HF_CREDENTIALS`, chamada `subscribe` com `input` e `withPolling: true`, e checagem de `result.status === 'completed'` antes de usar os resultados. A versão instalada retorna uma resposta com `status` e `video?.url`, em vez de um `JobSet`.

A página solicitada do modelo redireciona para https://open.higgsfield.ai/models/bytedance/seedance-2.5/text-to-video/api-reference. Esse novo domínio estava bloqueado na última tentativa e foi adicionado ao rascunho de rede. Os parâmetros e a disponibilidade do modelo ainda precisam de confirmação na página oficial antes da implementação. Nenhuma credencial faz parte desta referência.
