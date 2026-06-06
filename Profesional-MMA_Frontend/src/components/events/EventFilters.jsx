function EventFilters({ search, setSearch, location, setLocation }) {
  return (
    <div className="mb-8 grid gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-4 md:grid-cols-2">
      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Buscar evento..."
        className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
      />

      <input
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        placeholder="Filtrar por localización..."
        className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
      />
    </div>
  );
}

export default EventFilters;