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
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    weight_class: "",
    rounds: "",
    minutes_per_round: "",
    style: "",
  });

  useEffect(() => {
    let ignore = false;

    async function loadRule() {
      if (!isEditing) return;

      setLoading(true);
      setError("");

      try {
        const response = await getAdminRule(id);
        const rule = response.data;

        if (!ignore) {
          setForm({
            name: rule.name || "",
            weight_class: rule.weight_class || "",
            rounds: rule.rounds || "",
            minutes_per_round: rule.minutes_per_round || "",
            style: rule.style || "",
          });
        }
      } catch {
        if (!ignore) {
          setError("No se pudo cargar la regla.");
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
    setError("");

    try {
      const payload = {
        name: form.name,
        weight_class: form.weight_class,
        rounds: Number(form.rounds),
        minutes_per_round: Number(form.minutes_per_round),
        style: form.style,
      };

      if (isEditing) {
        await updateAdminRule(id, payload);
      } else {
        await createAdminRule(payload);
      }

      navigate("/admin/rules");
    } catch {
      setError("No se pudo guardar la regla. Revisa los datos.");
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
        <p className="text-sm uppercase text-blue-400">Administración</p>

        <h1 className="text-3xl font-black">
          {isEditing ? "Editar regla" : "Crear regla"}
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
        <div>
          <label className="mb-1 block text-sm text-slate-300">Nombre</label>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="MMA profesional"
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-slate-300">
            Categoría de peso
          </label>

          <input
            name="weight_class"
            value={form.weight_class}
            onChange={handleChange}
            placeholder="Peso ligero, peso medio..."
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-slate-300">
              Asaltos
            </label>

            <input
              type="number"
              name="rounds"
              value={form.rounds}
              onChange={handleChange}
              min="1"
              max="12"
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-300">
              Minutos por asalto
            </label>

            <input
              type="number"
              name="minutes_per_round"
              value={form.minutes_per_round}
              onChange={handleChange}
              min="1"
              max="30"
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm text-slate-300">Estilo</label>

          <input
            name="style"
            value={form.style}
            onChange={handleChange}
            placeholder="MMA, grappling, striking..."
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3"
          />
        </div>

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
            className="rounded-lg bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-500 disabled:opacity-60"
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