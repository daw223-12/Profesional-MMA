import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Edit,
  Plus,
  Scale,
  Trash,
} from "lucide-react";
import {
  deleteAdminRule,
  getAdminRules,
} from "../../api/adminRules.api";

function AdminRulesPage() {
  const [rules, setRules] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadRules() {
    setLoading(true);

    try {
      const response = await getAdminRules({
        search,
      });

      setRules(response.data.data || []);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "¿Eliminar esta regla?"
    );

    if (!confirmed) return;

    await deleteAdminRule(id);

    await loadRules();
  }

  useEffect(() => {
    let ignore = false;

    async function fetchRules() {
      setLoading(true);

      try {
        const response = await getAdminRules({
          search,
        });

        if (!ignore) {
          setRules(response.data.data || []);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    const timeout = setTimeout(fetchRules, 300);

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
            Reglas
          </h1>
        </div>

        <Link
          to="/admin/rules/create"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-500"
        >
          <Plus size={18} />
          Crear regla
        </Link>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar regla..."
        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3"
      />

      {loading ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
          Cargando reglas...
        </div>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rules.map((rule) => (
            <article
              key={rule.id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400">
                <Scale size={24} />
              </div>

              <h2 className="text-xl font-bold">
                {rule.name}
              </h2>

              <p className="mt-3 text-sm text-slate-400">
                {rule.description}
              </p>

              <div className="mt-4 flex gap-2">
                <Link
                  to={`/admin/rules/${rule.id}/edit`}
                  className="rounded-lg bg-slate-800 p-2 hover:bg-slate-700"
                >
                  <Edit size={17} />
                </Link>

                <button
                  onClick={() => handleDelete(rule.id)}
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

export default AdminRulesPage;