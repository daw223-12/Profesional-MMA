import { Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAdminEvent } from "../../api/adminEvents.api";
import {
  attachFighterToFight,
  createAdminFight,
  detachFighterFromFight,
  getAdminFight,
  updateAdminFight,
} from "../../api/adminFights.api";
import { getAdminFighters } from "../../api/adminFighters.api";
import { getAdminRules } from "../../api/adminRules.api";

function AdminFightFormPage() {
  const { id, eventId } = useParams();
  const navigate = useNavigate();

  const isEditing = Boolean(id);
  const isCreatingFromEvent = Boolean(eventId);

  const [event, setEvent] = useState(null);
  const [fighters, setFighters] = useState([]);
  const [rules, setRules] = useState([]);
  const [originalFighterIds, setOriginalFighterIds] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    rule_id: "",
    fight_type: "single",
    result_method: "",
    result_round: "",
    result_time: "",
  });

  const [participants, setParticipants] = useState([
    { fighter_id: "", weight: "", team_name: "" },
    { fighter_id: "", weight: "", team_name: "" },
  ]);

  useEffect(() => {
    let ignore = false;

    async function loadData() {
      setLoading(true);

      try {
        const [fightersResponse, rulesResponse] = await Promise.all([
          getAdminFighters(),
          getAdminRules(),
        ]);

        if (!ignore) {
          setFighters(fightersResponse.data.data || []);
          setRules(rulesResponse.data.data || []);
        }

        if (isCreatingFromEvent) {
          const eventResponse = await getAdminEvent(eventId);

          if (!ignore) {
            setEvent(eventResponse.data);
          }
        }

        if (isEditing) {
          const fightResponse = await getAdminFight(id);
          const fight = fightResponse.data;

          if (!ignore) {
            setEvent(fight.event);

            setForm({
              name: fight.name || "",
              rule_id: fight.rule_id || "",
              fight_type: fight.fight_type || "single",
              result_method: fight.result_method || "",
              result_round: fight.result_round || "",
              result_time: fight.result_time || "",
            });

            const loadedParticipants =
              fight.fighters?.map((fighter) => ({
                fighter_id: String(fighter.id),
                weight: fighter.pivot?.weight || "",
                team_name: fighter.pivot?.team_name || "",
              })) || [];

            setParticipants(
              loadedParticipants.length
                ? loadedParticipants
                : [{ fighter_id: "", weight: "", team_name: "" }]
            );

            setOriginalFighterIds(fight.fighters?.map((f) => f.id) || []);
          }
        }
      } catch {
        if (!ignore) {
          setError("No se pudieron cargar los datos.");
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
  }, [id, eventId, isEditing, isCreatingFromEvent]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function updateParticipant(index, field, value) {
    const updated = [...participants];
    updated[index][field] = value;
    setParticipants(updated);
  }

  function addParticipant() {
    setParticipants([...participants, { fighter_id: "", weight: "", team_name: "" }]);
  }

  function removeParticipant(index) {
    if (participants.length === 1) return;
    setParticipants(participants.filter((_, i) => i !== index));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const fightPayload = {
        name: form.name,
        rule_id: Number(form.rule_id),
        fight_type: form.fight_type,
        result_method: form.result_method || null,
        result_round: form.result_round ? Number(form.result_round) : null,
        result_time: form.result_time || null,
      };

      let fight;

      if (isEditing) {
        const response = await updateAdminFight(id, fightPayload);
        fight = response.data;

        const currentIds = participants
          .filter((p) => p.fighter_id)
          .map((p) => Number(p.fighter_id));

        const removedIds = originalFighterIds.filter(
          (fighterId) => !currentIds.includes(fighterId)
        );

        await Promise.all(
          removedIds.map((fighterId) => detachFighterFromFight(id, fighterId))
        );
      } else {
        const response = await createAdminFight(eventId, fightPayload);
        fight = response.data;
      }

      const fightId = fight.id;

      const validParticipants = participants.filter((p) => p.fighter_id);

      await Promise.all(
        validParticipants.map((participant) =>
          attachFighterToFight(fightId, {
            fighter_id: Number(participant.fighter_id),
            weight: participant.weight ? Number(participant.weight) : null,
            team_name: participant.team_name || null,
          })
        )
      );

      const targetEventId = event?.id || eventId || fight.event_id;
      navigate(`/admin/events/${targetEventId}/edit`);
    } catch {
      setError("No se pudo guardar la pelea. Revisa los datos.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
        Cargando pelea...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <p className="text-sm uppercase text-blue-400">Administración</p>
        <h1 className="text-3xl font-black">
          {isEditing ? "Editar pelea" : "Crear pelea"}
        </h1>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-red-300">
          {error}
        </div>
      )}

      {event && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-sm text-slate-400">Evento asociado</p>
          <p className="text-lg font-bold text-blue-400">{event.name}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900 p-6"
      >
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Datos de la pelea</h2>

          <div>
            <label className="mb-1 block text-sm text-slate-300">
              Nombre de la pelea
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Main Event, Co-Main Event..."
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-slate-300">Regla</label>
              <select
                name="rule_id"
                value={form.rule_id}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
                required
              >
                <option value="">Seleccionar regla</option>
                {rules.map((rule) => (
                  <option key={rule.id} value={rule.id}>
                    {rule.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm text-slate-300">
                Tipo de pelea
              </label>
              <select
                name="fight_type"
                value={form.fight_type}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
              >
                <option value="single">1 vs 1</option>
                <option value="team">Equipos</option>
                <option value="free_for_all">Todos contra todos</option>
              </select>
            </div>
          </div>
        </section>

        <section className="space-y-4 border-t border-slate-800 pt-6">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold">Participantes</h2>
              <p className="text-sm text-slate-400">
                Añade tantos peleadores como necesite el formato.
              </p>
            </div>

            <button
              type="button"
              onClick={addParticipant}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-500"
            >
              <Plus size={18} />
              Añadir peleador
            </button>
          </div>

          <div className="space-y-4">
            {participants.map((participant, index) => (
              <div
                key={index}
                className="grid gap-4 rounded-xl border border-slate-800 bg-slate-950 p-4 md:grid-cols-[2fr_1fr_1fr_auto]"
              >
                <div>
                  <label className="mb-1 block text-sm text-slate-300">
                    Peleador
                  </label>
                  <select
                    value={participant.fighter_id}
                    onChange={(e) =>
                      updateParticipant(index, "fighter_id", e.target.value)
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-blue-500"
                    required
                  >
                    <option value="">Seleccionar peleador</option>
                    {fighters.map((fighter) => (
                      <option key={fighter.id} value={fighter.id}>
                        {fighter.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm text-slate-300">Peso</label>
                  <input
                    type="number"
                    step="0.01"
                    value={participant.weight}
                    onChange={(e) =>
                      updateParticipant(index, "weight", e.target.value)
                    }
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm text-slate-300">
                    Equipo / esquina
                  </label>
                  <input
                    value={participant.team_name}
                    onChange={(e) =>
                      updateParticipant(index, "team_name", e.target.value)
                    }
                    placeholder="Red Corner, Team A..."
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => removeParticipant(index)}
                    className="rounded-lg bg-red-500/10 p-3 text-red-400 hover:bg-red-500/20"
                  >
                    <Trash size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="flex flex-col gap-3 border-t border-slate-800 pt-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => navigate(`/admin/events/${event?.id || eventId}/edit`)}
            className="rounded-lg border border-slate-700 px-4 py-2 hover:bg-slate-800"
          >
            Cancelar
          </button>

          <button
            disabled={saving}
            className="rounded-lg bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-500 disabled:opacity-60"
          >
            {saving ? "Guardando..." : isEditing ? "Guardar cambios" : "Crear pelea"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminFightFormPage;