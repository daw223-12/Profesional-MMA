import { useEffect, useState } from "react";
import EventGrid from "../../components/events/EventGrid";
import { getFavorites } from "../../api/favorites.api";

function FavoritesPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadFavorites() {
      setLoading(true);
      setError("");

      try {
        const response = await getFavorites();

        if (!ignore) {
          setEvents(response.data || []);
        }
      } catch {
        if (!ignore) {
          setError(
            "No se pudieron cargar tus favoritos. Recuerda que requiere premium.",
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadFavorites();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div
      id="homePageContainer"
      className="flex min-h-screen justify-center pt-10"
    >
      <div id="profilePageContent" className="mt-8 w-full max-w-7xl space-y-10">

        <div id="spacer" className="h-2"></div>

        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 md:p-8">
          <p className="text-sm uppercase text-blue-400">Área premium</p>
          <h1 className="mt-2 text-4xl font-black">Mis favoritos</h1>
          <p className="mt-3 text-slate-400">
            Consulta los eventos que has guardado para seguirlos fácilmente.
          </p>
        </section>

        <div id="spacer" className="h-2"></div>

        {loading && (
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
            Cargando favoritos...
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-red-300">
            {error}
          </div>
        )}

        {!loading && !error && <EventGrid events={events} />}
      </div>
    </div>
  );
}

export default FavoritesPage;
