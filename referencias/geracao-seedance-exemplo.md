# Geração real de exemplo — Seedance 2.5

Validação realizada em 8 de outubro de 2026. A geração paga foi autorizada pelo usuário.

- Comando: `npm run generate:example` na raiz do repositório.
- SDK: `@higgsfield/client@0.2.6`, módulo servidor `@higgsfield/client/v2`.
- Método: `subscribe` com `withPolling: true`.
- Modelo: `bytedance/seedance-2.5/text-to-video`.
- Parâmetros enviados: prompt `A cinematic scene at sunset`, duração 5, resolução `720p` e proporção `16:9`.
- Resultado: o script confirmou `status === 'completed'` e validou a URL HTTPS de vídeo; código de saída 0.
- Credencial: carregada em tempo de execução pelo arquivo privado `.env.local`; seu valor não está neste registro.

[Vídeo retornado pela API](https://d3u0tzju9qaucj.cloudfront.net/5256a7c9-c4a5-420f-a9a9-3fa66df185a5/2f729cbe-c10d-4042-833a-5ccde1f381a9.mp4)

Esse resultado veio de uma chamada real, separado dos 13 testes locais com respostas simuladas. O arquivo de vídeo não foi baixado nem analisado neste ambiente; os parâmetros acima descrevem a requisição enviada. A disponibilidade futura da URL depende da retenção da Higgsfield.
