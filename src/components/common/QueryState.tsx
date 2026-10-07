import { AlertTriangle, Loader2 } from "lucide-react";

interface QueryStateProps {
  loading?: boolean;
  error?: Error | null;
  empty?: boolean;
  emptyLabel?: string;
}

/** Estados de carregamento, erro e vazio padronizados. */
const QueryState = ({ loading, error, empty, emptyLabel }: QueryStateProps) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center gap-3 rounded-xl border border-border bg-card py-16 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span className="text-sm">Carregando dados da temporada…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/5 p-5">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
        <div>
          <p className="font-semibold text-foreground">Não foi possível carregar os resultados</p>
          <p className="mt-1 text-sm text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  if (empty) {
    return (
      <div className="rounded-xl border border-border bg-card py-14 text-center text-sm text-muted-foreground">
        {emptyLabel ?? "Nada por aqui ainda."}
      </div>
    );
  }

  return null;
};

export default QueryState;
