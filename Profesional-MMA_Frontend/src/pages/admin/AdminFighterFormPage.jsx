import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createAdminFighter,
  getAdminFighter,
  updateAdminFighter,
} from "../../api/adminFighters.api";

function AdminFighterFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    nickname: "",
    wins: 0,
    losses: 0,
    draws: 0,
    height: "",
    reach: "",
    photo_url: "",
  });

  useEffect(() => {
    let ignore = false;

    async function loadFighter() {
      if (!isEditing) return;

      setLoading(true);
      setError("");

      try {
        const response = await getAdminFighter(id);
        const fighter = response.data;

        if (!ignore) {
          setForm({
            name: fighter.name || "",
            nickname: fighter.nickname || "",
            wins: fighter.wins ?? 0,
            losses: fighter.losses ?? 0,
            draws: fighter.draws ?? 0,
            height: fighter.height || "",
            reach: fighter.reach || "",
            photo_url: fighter.photo_url || "",
          });
        }
      } catch {
        if (!ignore) {
          setError("No se pudo cargar el peleador.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadFighter();

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
        nickname: form.nickname || null,
        wins: Number(form.wins || 0),
        losses: Number(form.losses || 0),
        draws: Number(form.draws || 0),
        height: form.height ? Number(form.height) : null,
        reach: form.reach ? Number(form.reach) : null,
        photo_url: form.photo_url || null,
      };

      if (isEditing) {
        await updateAdminFighter(id, payload);
      } else {
        await createAdminFighter(payload);
      }

      navigate("/admin/fighters");
    } catch {
      setError("No se pudo guardar el peleador. Revisa los datos.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
        Cargando peleador...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <p className="text-sm uppercase text-blue-400">Administración</p>

        <h1 className="text-3xl font-black">
          {isEditing ? "Editar peleador" : "Crear peleador"}
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
            <label className="mb-1 block text-sm text-slate-300">
              Nombre
            </label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-300">
              Mote
            </label>

            <input
              name="nickname"
              value={form.nickname}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm text-slate-300">
              Victorias
            </label>

            <input
              type="number"
              name="wins"
              value={form.wins}
              onChange={handleChange}
              min="0"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-300">
              Derrotas
            </label>

            <input
              type="number"
              name="losses"
              value={form.losses}
              onChange={handleChange}
              min="0"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-300">
              Empates
            </label>

            <input
              type="number"
              name="draws"
              value={form.draws}
              onChange={handleChange}
              min="0"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-slate-300">
              Altura (cm)
            </label>

            <input
              type="number"
              name="height"
              value={form.height}
              onChange={handleChange}
              min="100"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-300">
              Envergadura (cm)
            </label>

            <input
              type="number"
              name="reach"
              value={form.reach}
              onChange={handleChange}
              min="100"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm text-slate-300">
            URL fotografía
          </label>

          <input
            name="photo_url"
            value={form.photo_url}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => navigate("/admin/fighters")}
            className="rounded-lg border border-slate-700 px-4 py-2 hover:bg-slate-800"
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
                : "Crear peleador"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminFighterFormPage;