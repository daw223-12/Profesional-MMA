import { Calendar, Heart, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

function EventCard({ event, isFavorite = false }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg transition hover:-translate-y-1 hover:border-blue-500">
      <div className="relative h-44 bg-slate-800">
        <img
          src={event.image_url || "/placeholder-event.jpg"}
          alt={event.name}
          onError={(e) => {
            e.currentTarget.src = "/placeholder-event.jpg";
          }}
          className="h-full w-full object-cover"
        />

        {isFavorite && (
          <div className="absolute right-3 top-3 rounded-full bg-green-500/20 p-2 text-green-300 backdrop-blur">
            <Heart size={18} fill="currentColor" />
          </div>
        )}
      </div>

      <div className="space-y-3 p-4">
        <h2 className="text-xl font-bold">{event.name}</h2>

        <div className="space-y-2 text-sm text-slate-400">
          <p className="flex items-center gap-2">
            <Calendar size={16} />
            {new Date(event.date).toLocaleDateString("es-ES")}
          </p>

          <p className="flex items-center gap-2">
            <MapPin size={16} />
            {event.location}
          </p>
        </div>

        <p className="line-clamp-2 text-sm text-slate-300">
          {event.promotion?.name
            ? `Promotora: ${event.promotion.name}`
            : "Evento profesional de MMA"}
        </p>

        <Link
          to={`/events/${event.id}`}
          className="inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-500"
        >
          Ver evento
        </Link>
      </div>
    </article>
  );
}

export default EventCard;