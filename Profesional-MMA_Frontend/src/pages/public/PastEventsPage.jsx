import { useEffect, useState } from "react";
import EventFilters from "../../components/events/EventFilters";
import EventGrid from "../../components/events/EventGrid";
import { getPastEvents } from "../../api/events.api";

function PastEventsPage() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadPastEvents() {
      setLoading(true);
      setError("");

      try {
        const response = await getPastEvents({
          search,
          location,
        });

        if (!ignore) {
          setEvents(response.data.data || []);
        }
      } catch {
        if (!ignore) {
          setError(
            "No se pudieron cargar los eventos históricos. Esta sección requiere premium."
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    const timeout = setTimeout(loadPastEvents, 300);

    return () => {
      ignore = true;
      clearTimeout(timeout);
    };
  }, [search, location]);

  return (
    <div
      id="pastEventsPageContainer"
      className="min-h-screen flex justify-center pt-10"
    >
      <div id="profilePageContent" className="mt-8 w-full max-w-7xl space-y-10">
        <div id="spacer" className="h-4"></div>

        <section className="mb-8 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 md:p-10">
          <p className="mb-3 text-sm font-semibold uppercase text-blue-400">
            Área premium
          </p>

          <h1 className="max-w-3xl text-4xl font-black tracking-tight md:text-6xl">
            Eventos históricos de MMA.
          </h1>

          <p className="mt-4 max-w-2xl text-slate-400">
            Consulta eventos ya celebrados, resultados y carteleras anteriores.
          </p>
        </section>

        <div id="spacer" className="h-2"></div>

        <EventFilters
          search={search}
          setSearch={setSearch}
          location={location}
          setLocation={setLocation}
        />

        <div id="spacer" className="h-2"></div>

        {loading && (
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
            Cargando eventos históricos...
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

export default PastEventsPage;