import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Edit, Plus, Trash } from "lucide-react";
import { deleteAdminEvent, getAdminEvents } from "../../api/adminEvents.api";

function AdminEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadEvents() {
    setLoading(true);

    try {
      const response = await getAdminEvents();
      setEvents(response.data.data || []);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm("¿Eliminar este evento?");

    if (!confirmed) return;

    await deleteAdminEvent(id);
    await loadEvents();
  }

    // TODO AQUI HAY ALGO RARO. Mantén loadEvents para el delete, o si quieres evitar duplicar lógica, luego lo refinamos. Para ir rápido, este cambio es suficiente.
  useEffect(() => {
    let ignore = false;

    async function fetchEvents() {
      setLoading(true);

      try {
        const response = await getAdminEvents();

        if (!ignore) {
          setEvents(response.data.data || []);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchEvents();

    return () => {
      ignore = true;
    };
  }, []);



  if (loading) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
        Cargando eventos...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm uppercase text-blue-400">Administración</p>
          <h1 className="text-3xl font-black">Eventos</h1>
        </div>

        <Link
          to="/admin/events/create"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-500"
        >
          <Plus size={18} />
          Crear evento
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="hidden grid-cols-5 border-b border-slate-800 px-4 py-3 text-sm font-semibold text-slate-400 md:grid">
          <span>Evento</span>
          <span>Fecha</span>
          <span>Localización</span>
          <span>Estado</span>
          <span>Acciones</span>
        </div>

        {events.map((event) => (
          <div
            key={event.id}
            className="grid gap-3 border-b border-slate-800 px-4 py-4 last:border-b-0 md:grid-cols-5 md:items-center"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400">
                <CalendarDays size={20} />
              </div>

              <span className="font-semibold">{event.name}</span>
            </div>

            <span className="text-sm text-slate-400">
              {new Date(event.date).toLocaleDateString("es-ES")}
            </span>

            <span className="text-sm text-slate-400">{event.location}</span>

            <span className="w-fit rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-300">
              {event.status}
            </span>

            <div className="flex gap-2">
              <Link
                to={`/admin/events/${event.id}/edit`}
                className="rounded-lg bg-slate-800 p-2 hover:bg-slate-700"
              >
                <Edit size={17} />
              </Link>

              <button
                onClick={() => handleDelete(event.id)}
                className="rounded-lg bg-red-500/10 p-2 text-red-400 hover:bg-red-500/20"
              >
                <Trash size={17} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminEventsPage;
