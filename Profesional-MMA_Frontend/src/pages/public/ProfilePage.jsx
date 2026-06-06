import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  getProfile,
  updateProfile,
  deleteProfile,
} from "../../api/profile.api";

function ProfilePage() {
  const navigate = useNavigate();

  const { updateUser, logout } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadProfile() {
      try {
        const response = await getProfile();

        if (!ignore) {
          setForm({
            name: response.data.name || "",
            email: response.data.email || "",
            password: "",
            password_confirmation: "",
          });
        }
      } catch {
        if (!ignore) {
          setError("No se pudo cargar el perfil.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      ignore = true;
    };
  }, []);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    if (form.password && form.password !== form.password_confirmation) {
      setError("Las contraseñas no coinciden.");
      setSaving(false);
      return;
    }

    try {
      const payload = {
        name: form.name,
        email: form.email,
      };

      if (form.password) {
        payload.password = form.password;
        payload.password_confirmation = form.password_confirmation;
      }

      const response = await updateProfile(payload);

      updateUser(response.data);

      setForm({
        name: response.data.name || "",
        email: response.data.email || "",
        password: "",
        password_confirmation: "",
      });

      setMessage("Perfil actualizado correctamente.");
    } catch {
      setError("No se pudo actualizar el perfil.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteAccount() {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.",
    );

    if (!confirmed) return;

    try {
      await deleteProfile();

      await logout();

      navigate("/");
    } catch {
      setError("No se pudo eliminar la cuenta.");
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
        Cargando perfil...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center px-4 pt-10 ">
      <div className="w-full max-w-3xl space-y-4 ">

        <div class>
          <p className="text-sm uppercase text-blue-400 mt-8!">Cuenta</p>
          <h1 className="text-3xl font-black mb-2! mt-2!">Mi perfil</h1>
        </div>
        {message && (
          <div className="rounded-xl border border-green-500/40 bg-green-500/10 p-4 text-green-300">
            {message}
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-red-300 text-center ">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-slate-800 bg-slate-800 mt-4! px-4! py-10!"
        >
          <label htmlFor="">Nombre</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nombre"
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3"
          />

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="">Nueva contraseña</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Nueva contraseña"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3"
              />
            </div>
            <div>
              <label htmlFor="">Repetir contraseña</label>
              <input
                type="password"
                name="password_confirmation"
                value={form.password_confirmation}
                onChange={handleChange}
                placeholder="Repetir contraseña"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 "
              />
            </div>
          </div>

          <button
            disabled={saving}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 mt-4! font-semibold hover:bg-blue-500 disabled:opacity-60"
          >
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
        </form>
        <div className="border-t border-slate-800 pt-6 ">
          <h2 className="text-lg font-bold text-red-400 mt-2!">Zona peligrosa</h2>

          <p className="mt-2 text-sm text-slate-400">
            Eliminar tu cuenta borrará toda tu información asociada. Esta acción
            no se puede deshacer.
          </p>

          <button
            type="button"
            onClick={handleDeleteAccount}
            className="mt-4 pl-4! pr-4! rounded-lg bg-red-600 px-4 py-2 font-semibold hover:bg-red-500 disabled:opacity-60"
          >
            Eliminar cuenta
          </button>
          {/* className="mt-4 w-full rounded-lg bg-red-600 px-4 py-2 font-semibold hover:bg-red-500 disabled:opacity-60" */}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;