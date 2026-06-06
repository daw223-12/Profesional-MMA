import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createAdminPromotion,
  getAdminPromotion,
  updateAdminPromotion,
} from "../../api/adminPromotions.api";

function AdminPromotionFormPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    website_url: "",
    image_url: "",
  });

  useEffect(() => {
    let ignore = false;

    async function loadPromotion() {
      if (!isEditing) return;

      try {
        const response = await getAdminPromotion(id);

        if (!ignore) {
          const promotion = response.data;

          setForm({
            name: promotion.name || "",
            description: promotion.description || "",
            website_url: promotion.website_url || "",
            image_url: promotion.image_url || "",
          });
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadPromotion();

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
        await updateAdminPromotion(id, form);
      } else {
        await createAdminPromotion(form);
      }

      navigate("/admin/promotions");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
        Cargando promotora...
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
            ? "Editar promotora"
            : "Crear promotora"}
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

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={5}
          placeholder="Descripción"
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3"
        />

        <input
          name="website_url"
          value={form.website_url}
          onChange={handleChange}
          placeholder="https://..."
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
            onClick={() =>
              navigate("/admin/promotions")
            }
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
              : "Crear promotora"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminPromotionFormPage;