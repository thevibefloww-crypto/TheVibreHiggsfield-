# Referência de animação com Genjutsu

## Pedido e fontes

Animar a foto vertical enviada no chat, combinando olhos vermelhos, aura, clones temporários e distorção do cenário, sem corvos.

Documentação oficial consultada antes da implementação:

- [Genjutsu Motion Transfer](https://open.higgsfield.ai/models/higgsfield/genjutsu/motion-transfer/v1.0/api-reference)
- [SDK](https://docs.higgsfield.ai/docs/how-to/sdk)
- [Envio de arquivos](https://docs.higgsfield.ai/docs/concepts/file-uploads)
- [Seedance 2.5](https://console.higgsfield.ai/models/bytedance/seedance-2.5/text-to-video/api-reference)

O modelo `higgsfield/genjutsu/motion-transfer/v1.0` transfere movimento de um vídeo para referências de imagem. Exige vídeo de pelo menos 4 segundos e de 1 a 8 imagens; a duração acompanha o vídeo de origem. O SDK servidor usa `@higgsfield/client/v2`, `subscribe` e `withPolling: true`.

## Resultado confirmado

1. A foto do chat foi editada como referência visual com olhos vermelhos e aura.
2. Seedance 2.5 gerou o vídeo de movimento em uma solicitação paga, com resposta `completed`.
3. A imagem foi enviada pelo protocolo oficial, com todos os `upload_headers` e sem enviar a credencial ao armazenamento.
4. Uma solicitação paga Genjutsu terminou com `completed` e URL HTTPS. O vídeo foi baixado e inspecionado; olhos vermelhos, aura e dois clones aparecem.
5. A ondulação do cenário foi reforçada localmente com FFmpeg entre 5 e 7 segundos, preservando uma faixa central e aumentando gradualmente o deslocamento nas laterais. Essa etapa não enviou uma nova geração de modelo.
6. A versão final foi enviada para disponibilizar um link de vídeo; a URL respondeu HTTP 200 e `video/mp4`.

O vídeo final mede 8,041667 segundos, 720 × 1280, 24 fps, H.264. O modelo ajustou pose, enquadramento e disposição do cenário; não é uma reprodução geometricamente idêntica da foto original.

## Materiais guardados no ambiente

- `genjutsu.local/reference.png`: edição da foto original.
- `genjutsu.local/motion.mp4` e `motion-result.json`: movimento Seedance, prompt e metadados.
- `genjutsu.local/image-result.json`: confirmação do upload da referência.
- `genjutsu.local/genjutsu.mp4` e `result.json`: resultado original Genjutsu.
- `genjutsu.local/final.mp4` e `final-result.json`: versão com ondulação, URL de entrega e medidas verificadas.

A pasta `*.local` é ignorada pelo Git. As imagens, vídeos e URLs desses materiais não foram adicionados ao repositório público. A imagem original está no chat; o arquivo local é sua edição usada como referência.

## Rede e custo

Os domínios de armazenamento e mídia foram acrescentados ao rascunho, preservando os anteriores: `fnf-api-input-prod-20250414194641741400000002.s3.amazonaws.com`, `d3snorpfx4xhv8.cloudfront.net` e `d3u0tzju9qaucj.cloudfront.net`. Upload e download reais validaram o acesso após o bloqueio inicial. Publicação e restauração em uma nova tarefa não foram verificadas.

Esta animação usou duas solicitações de geração de vídeo, além do teste inicial do projeto. O valor cobrado e o saldo da conta não foram consultados. O usuário pediu para avançar devagar e economizar: confirmar com ele antes de qualquer nova geração paga.
