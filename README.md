# E Quando o Amor Acaba?

Página de captura e diagnóstico do curso **E Quando o Amor Acaba?**, de Mara Lazarini e Giselli Louback.

## O que é

Uma página única, sem dependências e sem build. Todo o conteúdo — incluindo a imagem da marca — está embutido em `index.html`. Basta abrir o arquivo ou servi-lo por HTTP.

O coração da página é o **Diagnóstico Terapêutico do Relacionamento**: 50 perguntas em 5 etapas, pontuadas de 0 a 5, que rodam inteiramente no navegador. Nenhuma resposta sai do dispositivo de quem responde.

## Estrutura

```
index.html     a página inteira (HTML + CSS + JS + imagem embutida)
.nojekyll      impede o GitHub Pages de processar o arquivo como Jekyll
marca/         os arquivos da identidade visual
```

### marca/

| Arquivo | Uso |
|---|---|
| `ampulheta-coracao.svg` | Logo principal, vetor. Cabeçalho, favicon, avatar |
| `ampulheta-raio.svg` | Marca alternativa |
| `logo.png` | Render fotorrealista, fundo transparente, 1024×1535 |
| `logo-web.webp` | O mesmo render otimizado para web — 97 KB |
| `render-noite.png` | Versão para fundo escuro |
| `render-tempestade.png` | Versão para anúncio e capa |

> `logo.png` tem transparência apenas no entorno: o interior do vidro é branco opaco. Use somente sobre fundo claro. Para fundo escuro, use `render-noite.png`.

## Como o diagnóstico decide

Cada etapa soma de 0 a 50 pontos. A interpretação segue esta ordem de prioridade — segurança primeiro:

| Condição | Resultado | Trilha |
|---|---|---|
| Etapa 3 ≥ 25 | Adoecimento emocional | Cura emocional e reconstrução da identidade |
| E1 ≤ 18 e E4 ≤ 18 e E5 ≥ 30 | Encerramento emocional | Decisão e recomeço |
| E2 ≥ 30 ou E1 ≤ 20 ou E4 ≤ 20 | Desgaste avançado | Restaurando relacionamento |
| Nenhuma acima | Desgaste comum da rotina | Reconstrução do amor e conexão emocional |

Os limiares ficam na função `pick()` dentro de `index.html`, num só lugar, para serem calibrados conforme chegarem respostas reais.

## Pendências

- [ ] Link de checkout nos botões de compra (hoje apontam para o diagnóstico)
- [ ] Captura de e-mail ligada a uma ferramenta de e-mail marketing
- [ ] Depoimentos
- [ ] Fotos das autoras (hoje há apenas a inicial em serifa)

## Aviso

O diagnóstico é uma ferramenta de consciência emocional e apoio à decisão. Não constitui diagnóstico clínico nem substitui acompanhamento psicológico ou terapêutico profissional.

Em situação de violência: **180** (Central de Atendimento à Mulher) ou **190** em emergência. Em sofrimento emocional grave: **188** (CVV).
