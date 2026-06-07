import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  attachGymToFighter,
  createAdminFighter,
  getAdminFighter,
  updateAdminFighter,
} from "../../api/adminFighters.api";
import { getAdminGyms } from "../../api/adminGyms.api";
import { useAuth } from "../../hooks/useAuth";

function AdminFighterFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const isEditing = Boolean(id);
  const isGymAdmin = user?.role === "gym_admin";

  const [gyms, setGyms] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const [gymRelation, setGymRelation] = useState({
    gym_id: "",
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    let ignore = false;

    async function loadData() {
      setLoading(true);
      setError("");

      try {
        if (isGymAdmin) {
          if (!ignore && user?.gym_id) {
            setGyms([
              {
                id: user.gym_id,
                name: user.gym?.name || `Gimnasio #${user.gym_id}`,
              },
            ]);

            setGymRelation((current) => ({
              ...current,
              gym_id: String(user.gym_id),
            }));
          }
        } else {
          const gymsResponse = await getAdminGyms();

          if (!ignore) {
            setGyms(gymsResponse.data.data || []);
          }
        }

        if (isEditing) {
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

            const firstGym = fighter.gyms?.[0];

            if (firstGym) {
              setGymRelation({
                gym_id: String(firstGym.id),
                start_date: firstGym.pivot?.start_date || "",
                end_date: firstGym.pivot?.end_date || "",
              });
            }
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
  }, [id, isEditing, isGymAdmin, user?.gym_id, user?.gym?.name]);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function handleGymRelationChange(event) {
    setGymRelation({
      ...gymRelation,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (!gymRelation.gym_id) {
        setError("Debes seleccionar un gimnasio.");
        setSaving(false);
        return;
      }

      if (!gymRelation.start_date) {
        setError("La fecha de inicio del gimnasio es obligatoria.");
        setSaving(false);
        return;
      }

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

      if (isGymAdmin) {
        payload.start_date = gymRelation.start_date;
        payload.end_date = gymRelation.end_date || null;
      }

      let savedFighter;

      if (isEditing) {
        const response = await updateAdminFighter(id, payload);
        savedFighter = response.data;
      } else {
        const response = await createAdminFighter(payload);
        savedFighter = response.data;
      }

      if (!isGymAdmin) {
        await attachGymToFighter(savedFighter.id, {
          gym_id: Number(gymRelation.gym_id),
          start_date: gymRelation.start_date,
          end_date: gymRelation.end_date || null,
        });
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
        className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900 p-6"
      >
        <section className="space-y-5">
          <h2 className="text-xl font-bold">Datos del peleador</h2>

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
              <label className="mb-1 block text-sm text-slate-300">Mote</label>

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
        </section>

        <section className="space-y-5 border-t border-slate-800 pt-6">
          <div>
            <h2 className="text-xl font-bold">Gimnasio</h2>

            {isGymAdmin && (
              <p className="mt-1 text-sm text-slate-400">
                Como administrador de gimnasio, se usará automáticamente tu
                gimnasio asociado, pero puedes indicar las fechas de relación.
              </p>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm text-slate-300">
                Gimnasio
              </label>

              <select
                name="gym_id"
                value={gymRelation.gym_id}
                onChange={handleGymRelationChange}
                disabled={isGymAdmin}
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500 disabled:opacity-60"
              >
                <option value="">Seleccionar gimnasio</option>

                {gyms.map((gym) => (
                  <option key={gym.id} value={gym.id}>
                    {gym.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm text-slate-300">
                Fecha inicio
              </label>

              <input
                type="date"
                name="start_date"
                value={gymRelation.start_date}
                onChange={handleGymRelationChange}
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-slate-300">
                Fecha fin
              </label>

              <input
                type="date"
                name="end_date"
                value={gymRelation.end_date}
                onChange={handleGymRelationChange}
                min={gymRelation.start_date || undefined}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {isGymAdmin && (
            <div className="rounded-xl border border-yellow-500/40 bg-yellow-500/10 p-4 text-sm text-yellow-300">
              El gimnasio se asignará automáticamente al peleador según tu
              usuario de administrador de gimnasio.
            </div>
          )}
        </section>

        <div className="flex flex-col gap-3 border-t border-slate-800 pt-6 sm:flex-row sm:justify-end">
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