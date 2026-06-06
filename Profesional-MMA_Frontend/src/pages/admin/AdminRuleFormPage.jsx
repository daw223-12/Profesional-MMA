import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createAdminRule,
  getAdminRule,
  updateAdminRule,
} from "../../api/adminRules.api";

function AdminRuleFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    let ignore = false;

    async function loadRule() {
      if (!isEditing) return;

      try {
        const response = await getAdminRule(id);

        if (!ignore) {
          const rule = response.data;

          setForm({
            name: rule.name || "",
            description: rule.description || "",
          });
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadRule();

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
        await updateAdminRule(id, form);
      } else {
        await createAdminRule(form);
      }

      navigate("/admin/rules");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
        Cargando regla...
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
            ? "Editar regla"
            : "Crear regla"}
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
          rows={6}
          placeholder="Descripción"
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3"
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/admin/rules")}
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
                : "Crear regla"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminRuleFormPage;