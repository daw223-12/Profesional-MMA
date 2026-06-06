import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createAdminGym,
  getAdminGym,
  updateAdminGym,
} from "../../api/adminGyms.api";

function AdminGymFormPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    location: "",
    specialty: "",
    image_url: "",
  });

  useEffect(() => {
    let ignore = false;

    async function loadGym() {
      if (!isEditing) return;

      try {
        const response = await getAdminGym(id);

        if (!ignore) {
          const gym = response.data;

          setForm({
            name: gym.name || "",
            location: gym.location || "",
            specialty: gym.specialty || "",
            image_url: gym.image_url || "",
          });
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadGym();

    return () => {
      ignore = true;
    };
  }, [id, isEditing]);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setSaving(true);

    try {
      if (isEditing) {
        await updateAdminGym(id, form);
      } else {
        await createAdminGym(form);
      }

      navigate("/admin/gyms");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
        Cargando gimnasio...
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
            ? "Editar gimnasio"
            : "Crear gimnasio"}
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
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Ubicación"
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3"
        />

        <input
          name="specialty"
          value={form.specialty}
          onChange={handleChange}
          placeholder="Especialidad"
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3"
        />

        <input
          name="image_url"
          value={form.image_url}
          onChange={handleChange}
          placeholder="https://..."
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3"
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/admin/gyms")}
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
              : "Crear gimnasio"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminGymFormPage;