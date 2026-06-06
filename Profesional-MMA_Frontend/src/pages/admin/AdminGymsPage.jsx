import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Dumbbell,
  Edit,
  MapPin,
  Plus,
  Trash,
} from "lucide-react";
import {
  deleteAdminGym,
  getAdminGyms,
} from "../../api/adminGyms.api";

function AdminGymsPage() {
  const [gyms, setGyms] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadGyms() {
    setLoading(true);

    try {
      const response = await getAdminGyms({
        search,
      });

      setGyms(response.data.data || []);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "¿Eliminar este gimnasio?"
    );

    if (!confirmed) return;

    await deleteAdminGym(id);

    await loadGyms();
  }

  useEffect(() => {
    let ignore = false;

    async function fetchGyms() {
      setLoading(true);

      try {
        const response = await getAdminGyms({
          search,
        });

        if (!ignore) {
          setGyms(response.data.data || []);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    const timeout = setTimeout(fetchGyms, 300);

    return () => {
      ignore = true;
      clearTimeout(timeout);
    };
  }, [search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm uppercase text-blue-400">
            Administración
          </p>

          <h1 className="text-3xl font-black">
            Gimnasios
          </h1>
        </div>

        <Link
          to="/admin/gyms/create"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-500"
        >
          <Plus size={18} />
          Crear gimnasio
        </Link>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar gimnasio..."
        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3"
      />

      {loading ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
          Cargando gimnasios...
        </div>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gyms.map((gym) => (
            <article
              key={gym.id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400">
                <Dumbbell size={24} />
              </div>

              <h2 className="text-xl font-bold">
                {gym.name}
              </h2>

              <p className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                <MapPin size={15} />
                {gym.location}
              </p>

              <p className="mt-3 text-sm text-blue-400">
                {gym.specialty || "MMA"}
              </p>

              <p className="mt-3 text-sm text-slate-400">
                Peleadores: {gym.fighters?.length || 0}
              </p>

              <div className="mt-4 flex gap-2">
                <Link
                  to={`/admin/gyms/${gym.id}/edit`}
                  className="rounded-lg bg-slate-800 p-2 hover:bg-slate-700"
                >
                  <Edit size={17} />
                </Link>

                <button
                  onClick={() => handleDelete(gym.id)}
                  className="rounded-lg bg-red-500/10 p-2 text-red-400 hover:bg-red-500/20"
                >
                  <Trash size={17} />
                </button>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}

export default AdminGymsPage;