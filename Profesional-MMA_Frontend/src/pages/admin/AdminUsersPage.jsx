import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Crown,
  Edit,
  Plus,
  Trash,
  User,
} from "lucide-react";
import {
  deleteAdminUser,
  getAdminUsers,
} from "../../api/adminUsers.api";

function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadUsers() {
    setLoading(true);

    try {
      const response = await getAdminUsers({
        search,
      });

      setUsers(response.data.data || []);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "¿Eliminar este usuario?"
    );

    if (!confirmed) return;

    await deleteAdminUser(id);
    await loadUsers();
  }

  useEffect(() => {
    let ignore = false;

    async function fetchUsers() {
      setLoading(true);

      try {
        const response = await getAdminUsers({
          search,
        });

        if (!ignore) {
          setUsers(response.data.data || []);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    const timeout = setTimeout(fetchUsers, 300);

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
            Usuarios
          </h1>
        </div>

        <Link
          to="/admin/users/create"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-500"
        >
          <Plus size={18} />
          Crear usuario
        </Link>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar usuario..."
        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3"
      />

      {loading ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
          Cargando usuarios...
        </div>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <article
              key={user.id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400">
                {user.is_premium ? (
                  <Crown size={24} />
                ) : (
                  <User size={24} />
                )}
              </div>

              <h2 className="text-xl font-bold">
                {user.name}
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                {user.email}
              </p>

              <p className="mt-3 text-sm text-blue-400">
                {user.role}
              </p>

              <p className="mt-2 text-sm text-slate-400">
                {user.is_premium
                  ? "Premium"
                  : "Básico"}
              </p>

              <div className="mt-4 flex gap-2">
                <Link
                  to={`/admin/users/${user.id}/edit`}
                  className="rounded-lg bg-slate-800 p-2 hover:bg-slate-700"
                >
                  <Edit size={17} />
                </Link>

                <button
                  onClick={() => handleDelete(user.id)}
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

export default AdminUsersPage;