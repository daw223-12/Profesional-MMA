import EventCard from "./EventCard";

function EventGrid({ events, favoriteIds = [] }) {
  if (!events.length) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
        No se encontraron eventos.
      </div>
    );
  }

  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          isFavorite={favoriteIds.includes(event.id)}
        />
      ))}
    </section>
  );
}

export default EventGrid;