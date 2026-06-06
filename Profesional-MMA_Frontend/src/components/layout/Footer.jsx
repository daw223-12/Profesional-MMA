function Footer() {
  return (
    <footer className="mt-4 rounded-2xl border border-slate-800 bg-slate-900">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 md:grid-cols-3">

        <div>
          <h3 className="mb-2 text-lg font-bold text-blue-500">
            Professional MMA
          </h3>

          <p className="text-sm text-slate-400">
            Plataforma para la gestión y consulta
            de eventos de MMA.
          </p>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">
            Navegación
          </h4>

          <ul className="space-y-1 text-sm text-slate-400">
            <li>Eventos</li>
            <li>Peleadores</li>
            <li>Favoritos</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">
            Contacto
          </h4>

          <p className="text-sm text-slate-400">
            contacto@professionalmma.com
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;