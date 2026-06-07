import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createAdminUser,
  getAdminUser,
  updateAdminUser,
} from "../../api/adminUsers.api";
import { getAdminGyms } from "../../api/adminGyms.api";
import { getAdminPromotions } from "../../api/adminPromotions.api";

function AdminUserFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [gyms, setGyms] = useState([]);
  const [promotions, setPromotions] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    is_premium: false,
    gym_id: "",
    promotion_id: "",
  });

  useEffect(() => {
    let ignore = false;

    async function loadData() {
      setLoading(true);
      setError("");

      try {
        const [gymsResponse, promotionsResponse] = await Promise.all([
          getAdminGyms(),
          getAdminPromotions(),
        ]);

        if (!ignore) {
          setGyms(gymsResponse.data.data || []);
          setPromotions(promotionsResponse.data.data || []);
        }

        if (isEditing) {
          const response = await getAdminUser(id);
          const user = response.data;

          if (!ignore) {
            setForm({
              name: user.name || "",
              email: user.email || "",
              password: "",
              role: user.role || "user",
              is_premium: Boolean(user.is_premium),
              gym_id: user.gym_id ? String(user.gym_id) : "",
              promotion_id: user.promotion_id ? String(user.promotion_id) : "",
            });
          }
        }
      } catch {
        if (!ignore) {
          setError("No se pudieron cargar los datos del formulario.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      ignore = true;
    };
  }, [id, isEditing]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    let nextForm = {
      ...form,
      [name]: type === "checkbox" ? checked : value,
    };

    if (name === "role") {
      if (value !== "gym_admin") {
        nextForm.gym_id = "";
      }

      if (value !== "promoter_admin") {
        nextForm.promotion_id = "";
      }
    }

    setForm(nextForm);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setSaving(true);
    setError("");

    try {
      if (form.role === "gym_admin" && !form.gym_id) {
        setError("Debes seleccionar un gimnasio para un gym_admin.");
        setSaving(false);
        return;
      }

      if (form.role === "promoter_admin" && !form.promotion_id) {
        setError("Debes seleccionar una promotora para un promoter_admin.");
        setSaving(false);
        return;
      }

      const payload = {
        name: form.name,
        email: form.email,
        role: form.role,
        is_premium: Boolean(form.is_premium),
        gym_id: form.role === "gym_admin" ? Number(form.gym_id) : null,
        promotion_id:
          form.role === "promoter_admin" ? Number(form.promotion_id) : null,
      };

      if (form.password) {
        payload.password = form.password;
      }

      if (!isEditing && !form.password) {
        setError("La contraseña es obligatoria al crear un usuario.");
        setSaving(false);
        return;
      }

      if (isEditing) {
        await updateAdminUser(id, payload);
      } else {
        await createAdminUser(payload);
      }

      navigate("/admin/users");
    } catch (error) {
      console.log(error.response?.data);
      setError("No se pudo guardar el usuario. Revisa los datos.");
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
        <p className="text-sm uppercase text-blue-400">Administración</p>

        <h1 className="text-3xl font-black">
          {isEditing ? "Editar usuario" : "Crear usuario"}
        </h1>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-red-300">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-slate-800 bg-slate-900 p-6"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-slate-300">Nombre</label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nombre"
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-300">Email</label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm text-slate-300">
            Contraseña
          </label>

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder={
              isEditing ? "Dejar vacío para no cambiar" : "Contraseña"
            }
            required={!isEditing}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-slate-300">Rol</label>

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3"
            >
              <option value="user">User</option>
              <option value="gym_admin">Gym Admin</option>
              <option value="promoter_admin">Promoter Admin</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-950 px-4 py-3">
              <input
                type="checkbox"
                name="is_premium"
                checked={form.is_premium}
                onChange={handleChange}
              />

              Usuario premium
            </label>
          </div>
        </div>

        {form.role === "gym_admin" && (
          <div>
            <label className="mb-1 block text-sm text-slate-300">
              Gimnasio asociado
            </label>

            <select
              name="gym_id"
              value={form.gym_id}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3"
            >
              <option value="">Selecciona un gimnasio</option>

              {gyms.map((gym) => (
                <option key={gym.id} value={gym.id}>
                  {gym.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {form.role === "promoter_admin" && (
          <div>
            <label className="mb-1 block text-sm text-slate-300">
              Promotora asociada
            </label>

            <select
              name="promotion_id"
              value={form.promotion_id}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3"
            >
              <option value="">Selecciona una promotora</option>

              {promotions.map((promotion) => (
                <option key={promotion.id} value={promotion.id}>
                  {promotion.name}
                </option>
              ))}
            </select>
          </div>
        )}

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