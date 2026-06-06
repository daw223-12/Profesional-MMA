import { useEffect, useState } from "react";
import EventFilters from "../../components/events/EventFilters";
import EventGrid from "../../components/events/EventGrid";
import { getEvents } from "../../api/events.api";
import { getFavorites } from "../../api/favorites.api";

function HomePage() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [favoriteIds, setFavoriteIds] = useState([]);

  useEffect(() => {
    let ignore = false;

    async function loadEvents() {
      setLoading(true);
      setError("");

      try {
        const eventsResponse = await getEvents({
          search,
          location,
        });

        if (!ignore) {
          setEvents(eventsResponse.data.data || []);
        }

        try {
          const favoritesResponse = await getFavorites();

          if (!ignore) {
            setFavoriteIds(
              (favoritesResponse.data || []).map((favorite) => favorite.id)
            );
          }
        } catch {
          if (!ignore) {
            setFavoriteIds([]);
          }
        }
      } catch {
        if (!ignore) {
          setError("No se pudieron cargar los eventos.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    const timeout = setTimeout(loadEvents, 300);

    return () => {
      ignore = true;
      clearTimeout(timeout);
    };
  }, [search, location]);

  return (
    <div
      id="homePageContainer"
      className="flex min-h-screen justify-center pt-10"
    >
      <div id="profilePageContent" className="mt-8 w-full max-w-7xl space-y-10">
        <section className="mb-8 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 md:p-10">
          <p className="mb-3 text-sm font-semibold uppercase text-blue-400">
            Eventos de MMA
          </p>

          <h1 className="max-w-3xl text-4xl font-black tracking-tight md:text-6xl">
            Encuentra los próximos eventos de MMA profesional.
          </h1>

          <p className="mt-4 max-w-2xl text-slate-400">
            Consulta veladas, promotoras, peleas y contenido premium desde una
            única plataforma.
          </p>
        </section>

        <EventFilters
          search={search}
          setSearch={setSearch}
          location={location}
          setLocation={setLocation}
        />

        {loading && (
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
            Cargando eventos...
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-red-300">
            {error}
          </div>
        )}

        {!loading && !error && (
          <EventGrid events={events} favoriteIds={favoriteIds} />
        )}
      </div>
    </div>
  );
}

export default HomePage;