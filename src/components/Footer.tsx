const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-f1 rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-black text-sm">F1</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Calendário F1 2026 - Todos os direitos reservados
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground text-xs">
              Dados não oficiais - Apenas para fins informativos
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
