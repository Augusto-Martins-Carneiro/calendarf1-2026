## Plano

### 1. Logos das equipes na classificação de construtores
- Importar as 11 imagens PNG já geradas em `src/assets/teams/` em `StandingsView.tsx`.
- Criar um mapa `teamLogo(teamName)` retornando o asset correto.
- Substituir o badge com sigla (`teamAbbr`) por um círculo (`w-12 h-12`) com o logo (`object-contain`), mantendo borda colorida da equipe e fundo `${color}20`.
- Remover a função `teamAbbr` (não usada mais).
- Fazer o mesmo tratamento (com logo da equipe) no `RaceCard.tsx`, mostrando o logo ao lado do nome do time em cada linha de pódio (pequeno, ~20px).

### 2. Atualizar banco com resultados até o GP do Canadá
- Pesquisar resultados oficiais do GP do Canadá 2026 (corrida do dia 24/05 no calendário F1 2026).
- Atualizar `race_results` inserindo a corrida de Montreal (race_id correspondente, session_type `race`).
- Recalcular `driver_standings` e `constructor_standings` somando todos os pontos atuais + Canadá.
- Atualizar também `src/data/racePodiums.ts` para o pódio aparecer no card da corrida.

### 3. "Deixar o banco rodando para atualizar a cada corrida"
- O banco já está ativo (Lovable Cloud). Não precisa de processo extra.
- Documentar: para próximas corridas, basta pedir "atualiza GP X com pódio Y/Z/W" e o agente roda um `UPDATE`/`INSERT` nas três tabelas + `racePodiums.ts`.
- Opcionalmente: criar uma edge function admin para receber resultados via POST — só se você quiser. **Pergunto antes de incluir.**

### Pergunta antes de implementar
Você quer que eu:
- **(A)** Apenas atualize manualmente o GP do Canadá agora (e nas próximas corridas você me pede e eu atualizo), **ou**
- **(B)** Crie também uma página/edge function admin para você mesmo inserir resultados via formulário?

Posso confirmar os resultados oficiais do Canadá 2026 buscando na web antes de gravar no banco.
