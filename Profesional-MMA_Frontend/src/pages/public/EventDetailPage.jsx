import { Calendar, Euro, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvent } from "../../api/events.api";
import {
  addFavorite,
  removeFavorite,
  getFavorites,
} from "../../api/favorites.api";
import { Heart } from "lucide-react";

function EventDetailPage() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isFavorite, setIsFavorite] = useState(false);
  const [savingFavorite, setSavingFavorite] = useState(false);

  useEffect(() => {
    async function loadEvent() {
      setLoading(true);
      setError("");

      try {
        const response = await getEvent(id);
        setEvent(response.data);

        try {
          const favoritesResponse = await getFavorites();
          const favoriteEvents = favoritesResponse.data || [];

          setIsFavorite(
            favoriteEvents.some((favorite) => favorite.id === response.data.id),
          );
        } catch {
          setIsFavorite(false);
        }
      } catch {
        setError("No se pudo cargar el evento.");
      } finally {
        setLoading(false);
      }
    }

    loadEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
        Cargando evento...
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-red-300">
        {error || "Evento no encontrado."}
      </div>
    );
  }

  async function handleToggleFavorite() {
    if (!event) return;

    setSavingFavorite(true);

    try {
      if (isFavorite) {
        await removeFavorite(event.id);
        setIsFavorite(false);
      } else {
        await addFavorite(event.id);
        setIsFavorite(true);
      }
    } finally {
      setSavingFavorite(false);
    }
  }

  return (
    <div
      id="eventDetailPageContainer"
      className="min-h-screen flex justify-center pt-10"
    >
      <div id="profilePageContent" className="mt-8 w-full max-w-7xl space-y-10">
        <section className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
          <div className="h-64 bg-slate-800 md:h-96">
            <img
              src={event.image_url || "/placeholder-event.jpg"}
              alt={event.name}
              onError={(e) => {
                e.currentTarget.src = "/placeholder-event.jpg";
              }}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-5 p-6 md:p-8">
            <p className="text-sm text-blue-400">
              {event.promotion?.name || "Professional MMA"}
            </p>

            <h1 className="text-4xl font-black md:text-5xl">{event.name}</h1>

            <p className="max-w-3xl text-slate-400">
              Evento profesional de MMA con cartelera, peleadores y resultados.
            </p>

            <div className="grid gap-4 text-sm text-slate-300 sm:grid-cols-3">
              <div className="flex items-center gap-2 rounded-xl bg-slate-950 p-4">
                <Calendar size={18} />
                {new Date(event.date).toLocaleString("es-ES")}
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-slate-950 p-4">
                <MapPin size={18} />
                {event.location}
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-slate-950 p-4">
                <Euro size={18} />
                Desde {event.price}€
              </div>
            </div>

            <button
              onClick={handleToggleFavorite}
              disabled={savingFavorite}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 font-semibold transition ${
                isFavorite
                  ? "bg-green-500/20 text-green-300 hover:bg-red-500/20 hover:text-red-300"
                  : "bg-blue-600 text-white hover:bg-blue-500"
              }`}
            >
              <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />

              {savingFavorite
                ? "Guardando..."
                : isFavorite
                  ? "Quitar de favoritos"
                  : "Añadir a favoritos"}
            </button>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold">Cartelera</h2>

          {!event.fights?.length ? (
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
              Este evento todavía no tiene peleas registradas.
            </div>
          ) : (
            <div className="space-y-4">
              {event.fights.map((fight) => (
                <div
                  key={fight.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
                >
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold">{fight.name}</h3>
                      <p className="text-sm text-slate-400">
                        {fight.fight_type} · {fight.rule?.name}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {fight.fighters?.map((fighter) => (
                      <div
                        key={fighter.id}
                        className="rounded-xl bg-slate-950 p-4"
                      >
                        <p className="font-semibold">{fighter.name}</p>

                        <p className="text-sm text-slate-400">
                          {fighter.wins}-{fighter.losses}-{fighter.draws}
                        </p>

                        <p className="mt-2 text-xs text-blue-400">
                          {fighter.pivot?.team_name || "Participante"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default EventDetailPage;
