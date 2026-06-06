import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dumbbell, Edit, Plus, Trash } from "lucide-react";
import {
  deleteAdminFighter,
  getAdminFighters,
} from "../../api/adminFighters.api";

function AdminFightersPage() {
  const [fighters, setFighters] = useState([]);
  const [loading, setLoading] = useState(true);

  async function handleDelete(id) {
    const confirmed = window.confirm("¿Eliminar este peleador?");
    if (!confirmed) return;

    await deleteAdminFighter(id);
    await loadFighters();
  }

  async function loadFighters() {
    setLoading(true);

    try {
      const response = await getAdminFighters();
      setFighters(response.data.data || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let ignore = false;

    async function fetchFighters() {
      setLoading(true);

      try {
        const response = await getAdminFighters();

        if (!ignore) {
          setFighters(response.data.data || []);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchFighters();

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
        Cargando peleadores...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm uppercase text-blue-400">Administración</p>
          <h1 className="text-3xl font-black">Peleadores</h1>
        </div>

        <Link
          to="/admin/fighters/create"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-500"
        >
          <Plus size={18} />
          Crear peleador
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="hidden grid-cols-5 border-b border-slate-800 px-4 py-3 text-sm font-semibold text-slate-400 md:grid">
          <span>Peleador</span>
          <span>Mote</span>
          <span>Récord</span>
          <span>Gimnasios</span>
          <span>Acciones</span>
        </div>

        {fighters.map((fighter) => (
          <div
            key={fighter.id}
            className="grid gap-3 border-b border-slate-800 px-4 py-4 last:border-b-0 md:grid-cols-5 md:items-center"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400">
                <Dumbbell size={20} />
              </div>

              <span className="font-semibold">{fighter.name}</span>
            </div>

            <span className="text-sm text-slate-400">
              {fighter.nickname || "Sin mote"}
            </span>

            <span className="text-sm text-slate-400">
              {fighter.wins}-{fighter.losses}-{fighter.draws}
            </span>

            <span className="text-sm text-slate-400">
              {fighter.gyms?.length
                ? fighter.gyms.map((gym) => gym.name).join(", ")
                : "Sin gimnasio"}
            </span>

            <div className="flex gap-2">
              <Link
                to={`/admin/fighters/${fighter.id}/edit`}
                className="rounded-lg bg-slate-800 p-2 hover:bg-slate-700"
              >
                <Edit size={17} />
              </Link>

              <button
                onClick={() => handleDelete(fighter.id)}
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

export default AdminFightersPage;