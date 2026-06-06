import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createAdminUser,
  getAdminUser,
  updateAdminUser,
} from "../../api/adminUsers.api";

function AdminUserFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    is_premium: false,
  });

  useEffect(() => {
    let ignore = false;

    async function loadUser() {
      if (!isEditing) return;

      try {
        const response = await getAdminUser(id);

        if (!ignore) {
          const user = response.data;

          setForm({
            name: user.name || "",
            email: user.email || "",
            password: "",
            role: user.role || "user ",
            is_premium: Boolean(user.is_premium),
          });
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadUser();

    return () => {
      ignore = true;
    };
  }, [id, isEditing]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setSaving(true);

    try {
      const payload = { ...form };

      if (!payload.password) {
        delete payload.password;
      }

      if (isEditing) {
        await updateAdminUser(id, payload);
      } else {
        await createAdminUser(payload);
      }

      navigate("/admin/users");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
        Cargando usuario...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <p className="text-sm uppercase text-blue-400">
          Administración
        </p>

        <h1 className="text-3xl font-black">
          {isEditing
            ? "Editar usuario"
            : "Crear usuario"}
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-slate-800 bg-slate-900 p-6"
      >
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nombre"
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3"
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3"
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder={
            isEditing
              ? "Dejar vacío para no cambiar"
              : "Contraseña"
          }
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3"
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3"
        >
          <option value="user ">User</option>
          <option value="gym_admin">Gym Admin</option>
          <option value="promoter_admin">
            Promoter Admin
          </option>
          <option value="super_admin">
            Super Admin
          </option>
        </select>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="is_premium"
            checked={form.is_premium}
            onChange={handleChange}
          />

          Usuario premium
        </label>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/admin/users")}
            className="rounded-lg border border-slate-700 px-4 py-2"
          >
            Cancelar
          </button>

          <button
            disabled={saving}
            className="rounded-lg bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-500"
          >
            {saving
              ? "Guardando..."
              : isEditing
                ? "Guardar cambios"
                : "Crear usuario"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminUserFormPage;