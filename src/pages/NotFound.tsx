import { Link, useLocation } from "react-router-dom";
import { Flag } from "lucide-react";

const NotFound = () => {
  const { pathname } = useLocation();

  return (
    <div className="container mx-auto flex flex-col items-center px-4 py-24 text-center">
      <Flag className="h-10 w-10 text-primary" />
      <p className="mt-6 font-mono text-5xl font-black text-foreground">404</p>
      <h1 className="mt-2 text-2xl font-black uppercase tracking-wide text-foreground">
        Bandeira preta nesta página
      </h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        O endereço <span className="font-mono text-foreground">{pathname}</span> não existe neste
        app.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-primary-foreground hover:bg-primary/90"
      >
        Voltar ao início
      </Link>
    </div>
  );
};

export default NotFound;
