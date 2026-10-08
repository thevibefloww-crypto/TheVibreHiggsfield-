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

A página solicitada do modelo redireciona para https://open.higgsfield.ai/models/bytedance/seedance-2.5/text-to-video/api-reference e também foi consultada em 8 de outubro de 2026, antes da implementação do exemplo. Ela confirma o endpoint `https://api.higgsfield.ai/bytedance/seedance-2.5/text-to-video` e o uso de `subscribe` com `input` e `withPolling: true`. A resposta concluída contém o arquivo no campo `video`.

Parâmetros documentados: `prompt` obrigatório, `duration` inteiro de 4 a 30 segundos (padrão 5), `resolution` em `480p`, `720p` ou `1080p` (padrão `720p`), `aspect_ratio` em `16:9`, `4:3`, `1:1`, `3:4`, `9:16` ou `21:9` (padrão `16:9`), `output_format` em `mp4` ou `mov` (padrão `mp4`), e `generate_audio` booleano (padrão `true`). O exemplo usa somente os quatro parâmetros solicitados e os demais padrões da API.

A documentação confirma o identificador do modelo, mas uma geração com a conta do usuário ainda não foi validada. Nenhuma credencial faz parte desta referência.
