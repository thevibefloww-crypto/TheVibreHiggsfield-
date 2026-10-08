# Animação Genjutsu — continuidade

A primeira animação foi concluída. [Referência, fontes e materiais](../referencias/genjutsu.md).

## Decisões

- Combinar olhos vermelhos, aura, clones e distorção, sem corvos.
- Guardar a foto editada e os vídeos em `referencias/genjutsu.local/`, ignorada pelo Git.
- **Avançar devagar e confirmar com o usuário antes de qualquer nova geração paga.** Ele pediu para economizar durante esta execução. Não repetir exemplos ou modelos como verificação automática.

## Resultado e verificação

- Uma solicitação Seedance criou o movimento e uma solicitação Genjutsu criou a animação. Ambas retornaram `completed`.
- `npm run generate:genjutsu`, sessão `46032`, terminou com código 0. Metadados em `referencias/genjutsu.local/result.json`.
- Inspeção dos quadros confirmou olhos vermelhos, aura e clones. A distorção foi reforçada localmente com `server/genjutsu-background-wave.ffgraph`.
- Versão final: `referencias/genjutsu.local/final.mp4`. ffprobe confirmou 8,041667 segundos, 720 × 1280, 24 fps e H.264. A URL em `final-result.json` respondeu HTTP 200 com `video/mp4`.
- O modelo modificou pose, enquadramento e disposição do cenário. Não afirmar reprodução exata da composição original.
- Os 13 testes existentes de Seedance, lint e build com TypeScript passaram. Antes do upload, o comando Genjutsu parou sem enviar a requisição; depois foi executado de verdade e concluiu. Os testes simulados não validam o modelo ou a conta.
- O bloqueio inicial de rede foi superado. Upload e download funcionaram; publicação/restauração em uma nova tarefa seguem sem verificação.

## Reutilização

Reutilizar os arquivos existentes para revisões locais. Novas gerações exigem confirmação do usuário. O valor gasto e o saldo não foram consultados; não inventar valores.

O comando servidor lê `motion-result.json` e `image-result.json`, ou as variáveis não secretas `GENJUTSU_VIDEO_URL` e `GENJUTSU_IMAGE_URL`. Usa SDK oficial, autenticação somente no servidor, polling, POST sem repetição automática e validação de conclusão/URL. Importar o módulo não envia requisições. Erro ou timeout exige verificar a requisição existente antes de repetir o POST.

Para referências novas, obter URL assinada em `api.higgsfield.ai/files/generate-upload-url` e fazer PUT com todos os `upload_headers`. Nunca enviar a credencial ao armazenamento nem exibir a URL assinada. A URL de upload expira após uma hora. Gravar confirmação somente depois do PUT.

Para reproduzir a ondulação desta versão com FFmpeg, executar da raiz do projeto:

```sh
ffmpeg -i referencias/genjutsu.local/genjutsu.mp4 \
  -filter_complex_script server/genjutsu-background-wave.ffgraph \
  -map '[video]' -map '0:a?' -c:v libx264 -crf 18 -preset fast \
  -c:a copy -movflags +faststart referencias/genjutsu.local/final.mp4
```

Esse filtro foi verificado com o vídeo vertical de 720 × 1280 desta referência. Preservar o original ao experimentar ajustes.
