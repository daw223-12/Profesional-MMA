import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Building2, Edit, Globe, Plus, Trash } from "lucide-react";
import {
  deleteAdminPromotion,
  getAdminPromotions,
} from "../../api/adminPromotions.api";

function AdminPromotionsPage() {
  const [promotions, setPromotions] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadPromotions() {
    setLoading(true);

    try {
      const response = await getAdminPromotions({
        search,
      });

      setPromotions(response.data.data || []);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "¿Eliminar esta promotora?"
    );

    if (!confirmed) return;

    await deleteAdminPromotion(id);

    await loadPromotions();
  }

  useEffect(() => {
    let ignore = false;

    async function fetchPromotions() {
      setLoading(true);

      try {
        const response = await getAdminPromotions({
          search,
        });

        if (!ignore) {
          setPromotions(response.data.data || []);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    const timeout = setTimeout(fetchPromotions, 300);

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
            Promotoras
          </h1>
        </div>

        <Link
          to="/admin/promotions/create"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-500"
        >
          <Plus size={18} />
          Crear promotora
        </Link>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar promotora..."
        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3"
      />

      {loading ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
          Cargando promotoras...
        </div>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {promotions.map((promotion) => (
            <article
              key={promotion.id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400">
                <Building2 size={24} />
              </div>

              <h2 className="text-xl font-bold">
                {promotion.name}
              </h2>

              <p className="mt-2 line-clamp-3 text-sm text-slate-400">
                {promotion.description}
              </p>

              <p className="mt-4 text-sm text-blue-400">
                Eventos: {promotion.events_count}
              </p>

              {promotion.website_url && (
                <p className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                  <Globe size={15} />
                  {promotion.website_url}
                </p>
              )}

              <div className="mt-4 flex gap-2">
                <Link
                  to={`/admin/promotions/${promotion.id}/edit`}
                  className="rounded-lg bg-slate-800 p-2 hover:bg-slate-700"
                >
                  <Edit size={17} />
                </Link>

                <button
                  onClick={() =>
                    handleDelete(promotion.id)
                  }
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

export default AdminPromotionsPage;