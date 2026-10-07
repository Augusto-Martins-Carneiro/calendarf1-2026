# F1 2026

Calendário, resultados e classificação da temporada 2026 da Fórmula 1, em português.

- **Calendário** com as 23 etapas, horário de cada sessão convertido para o fuso do visitante
  e contagem regressiva para a próxima sessão.
- **Página por Grande Prêmio** com o resultado completo: grid de largada, voltas completadas,
  tempo ou motivo do abandono, melhor volta e pontuação. Sprints aparecem em tabela separada.
- **Classificação** de pilotos e construtores com vitórias, pódios e pontos.
- **Pilotos e equipes** com as cores e os escudos oficiais de 2026.

## Rodando

```bash
npm install
npm run dev
```

O app sobe em `http://localhost:8080`.

## De onde vêm os dados

| Dado | Origem |
| --- | --- |
| Calendário, circuitos, horários das sessões, grade de pilotos | `src/data/f1Data.ts` (estático) |
| Resultados de cada etapa e classificação | Supabase (`race_results`, `driver_standings`, `constructor_standings`) |

As tabelas do Supabase são somente leitura para o público (RLS com política de `SELECT`).

### Atualizando depois de uma corrida

```bash
npm run resultados
```

O script busca a temporada na API [Jolpica](https://api.jolpi.ca/ergast/f1/2026) (sucessora da
Ergast) e regrava `supabase/migrations/20261006120000_season_2026_full_results.sql` com todos os
resultados e a classificação. Em seguida, cole o conteúdo desse arquivo no **SQL Editor** do painel
do Supabase e execute. A migração derruba e recria as três tabelas, então pode ser aplicada quantas
vezes for preciso.

Se o banco ainda não recebeu a migração, o app mostra um aviso explicando isso em vez de uma tabela
vazia.

## Estrutura

```
src/
  components/
    common/      CountryFlag, TeamBadge, DriverAvatar, QueryState
    home/        NextRaceHero, Countdown
    layout/      SiteHeader, SiteFooter
    race/        RaceCard, ResultsTable, PodiumStrip, SessionSchedule
    standings/   DriverStandingsTable, ConstructorStandingsTable
    ui/          shadcn/ui
  data/          f1Data (calendário e grade), driverPhotos, teamLogos
  hooks/         useSeason (consultas ao Supabase via React Query)
  lib/           format (datas, horários e contagem regressiva em pt-BR)
  pages/         Home, CalendarPage, RacePage, StandingsPage, DriversPage, TeamsPage, TeamPage
```

## Observações

Projeto de fã, sem vínculo com a Formula One World Championship Ltd. Os escudos das equipes e as
fotos dos pilotos pertencem aos seus detentores de direitos.
