import { useEffect, useState } from "react";
import { Dumbbell } from "lucide-react";
import { getFighters } from "../../api/fighters.api";

function FightersPage() {
  const [fighters, setFighters] = useState([]);
  const [search, setSearch] = useState("");
  const [gymId, setGymId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadFighters() {
      setLoading(true);
      setError("");

      try {
        const response = await getFighters({
          search,
          gym_id: gymId || undefined,
        });

        if (!ignore) {
          setFighters(response.data.data || []);
        }
      } catch {
        if (!ignore) {
          setError("No se pudieron cargar los peleadores. Esta sección requiere premium.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    const timeout = setTimeout(loadFighters, 300);

    return () => {
      ignore = true;
      clearTimeout(timeout);
    };
  }, [search, gymId]);

  return (
    <div
      id="fightersPageContainer"
      className="min-h-screen flex justify-center pt-10"
    >
      <div id="profilePageContent" className="mt-8 w-full max-w-7xl space-y-10">

        <div id="spacer" className="h-4"></div>

        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 md:p-8">
          <p className="text-sm uppercase text-blue-400">Base de datos premium</p>
          <h1 className="mt-2 text-4xl font-black">Peleadores</h1>
          <p className="mt-3 text-slate-400">
            Explora perfiles de peleadores, récords y gimnasios asociados.
          </p>
        </section>

        <div id="spacer" className="h-2"></div>

        <div className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-4 md:grid-cols-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar peleador..."
            className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
          />

          <input
            value={gymId}
            onChange={(e) => setGymId(e.target.value)}
            placeholder="Filtrar por ID de gimnasio..."
            className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div id="spacer" className="h-2"></div>

        {loading && (
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
            Cargando peleadores...
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-red-300">
            {error}
          </div>
        )}

        {!loading && !error && (
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fighters.map((fighter) => (
              <article
                key={fighter.id}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-blue-500"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400">
                  <Dumbbell size={24} />
                </div>

                <h2 className="text-xl font-bold">{fighter.name}</h2>

                <p className="text-sm text-blue-400">
                  {fighter.nickname || "Sin mote"}
                </p>

                <p className="mt-3 text-slate-300">
                  Récord: {fighter.wins}-{fighter.losses}-{fighter.draws}
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  Gimnasios:{" "}
                  {fighter.gyms?.length
                    ? fighter.gyms.map((gym) => gym.name).join(", ")
                    : "No registrado"}
                </p>
              </article>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

export default FightersPage;