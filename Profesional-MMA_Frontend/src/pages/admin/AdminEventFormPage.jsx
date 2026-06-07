import { Edit, Plus, Swords, Trash } from "lucide-react";
import {
  deleteAdminFight,
  getAdminEventFights,
} from "../../api/adminFights.api";

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createAdminEvent,
  getAdminEvent,
  updateAdminEvent,
} from "../../api/adminEvents.api";
import { getAdminPromotions } from "../../api/adminPromotions.api";
import { useAuth } from "../../hooks/useAuth";

function AdminEventFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [fights, setFights] = useState([]);
  const [loadingFights, setLoadingFights] = useState(false);


  const { user } = useAuth();
  const isPromoterAdmin = user?.role === "promoter_admin";

  const [form, setForm] = useState({
    name: "",
    date: "",
    location: "",
    price: "",
    capacity: "",
    status: "draft",
    image_url: "",
    promotion_id: isPromoterAdmin ? String(user?.promotion_id || "") : "",
  });

  useEffect(() => {
    let ignore = false;

    async function loadData() {
      setLoading(true);
      setError("");

      try {
        const promotionsResponse = await getAdminPromotions();

        const availablePromotions = promotionsResponse.data.data || [];


        setPromotions(
          isPromoterAdmin
            ? availablePromotions.filter(
              (promotion) => Number(promotion.id) === Number(user?.promotion_id)
            )
            : availablePromotions
        );


        if (!ignore) {
          setPromotions(promotionsResponse.data.data || []);
        }

        if (isEditing) {
          const eventResponse = await getAdminEvent(id);
          const event = eventResponse.data;

          if (!ignore) {
            setForm({
              name: event.name || "",
              date: event.date ? event.date.slice(0, 16) : "",
              location: event.location || "",
              price: event.price || "",
              capacity: event.capacity || "",
              status: event.status || "draft",
              image_url: event.image_url || "",
              promotion_id: event.promotion_id || "",
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

  useEffect(() => {
    if (isEditing) {
      loadFights();
    }
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
        ...form,
        price: Number(form.price),
        capacity: form.capacity ? Number(form.capacity) : null,
        promotion_id: Number(form.promotion_id),
      };

      let response;

      if (isEditing) {
        response = await updateAdminEvent(id, payload);
        navigate("/admin/events");
      } else {
        response = await createAdminEvent(payload);
        navigate(`/admin/events/${response.data.id}/edit`);
      }

      // navigate("/admin/events");
    } catch {
      setError("No se pudo guardar el evento. Revisa los datos.");
    } finally {
      setSaving(false);
    }
  }

  async function loadFights() {
    if (!isEditing) return;

    setLoadingFights(true);

    try {
      const response = await getAdminEventFights(id);
      setFights(response.data || []);
    } finally {
      setLoadingFights(false);
    }
  }

  async function handleDeleteFight(fightId) {
    const confirmed = window.confirm("¿Eliminar esta pelea?");
    if (!confirmed) return;

    await deleteAdminFight(fightId);
    await loadFights();
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
        Cargando formulario...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="text-sm uppercase text-blue-400">Administración</p>
        <h1 className="text-3xl font-black">
          {isEditing ? "Editar evento" : "Crear evento"}
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
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-slate-300">Fecha</label>
            <input
              name="date"
              type="datetime-local"
              value={form.date}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-300">
              Localización
            </label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm text-slate-300">Precio</label>
            <input
              name="price"
              type="number"
              step="0.01"
              min="0"
              value={form.price}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-300">Aforo</label>
            <input
              name="capacity"
              type="number"
              min="1"
              value={form.capacity}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-300">Estado</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="draft">Borrador</option>
              <option value="published">Publicado</option>
              <option value="cancelled">Cancelado</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm text-slate-300">Promotora</label>
          <select
            name="promotion_id"
            value={isPromoterAdmin ? String(user?.promotion_id || "") : form.promotion_id}
            onChange={handleChange}
            disabled={isPromoterAdmin}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500 disabled:opacity-60"
            required
          >
            <option value="">Selecciona una promotora</option>
            {promotions.map((promotion) => (
              <option key={promotion.id} value={promotion.id}>
                {promotion.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm text-slate-300">
            URL de imagen
          </label>
          <input
            name="image_url"
            value={form.image_url}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => navigate("/admin/events")}
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
                : "Crear evento"}
          </button>
        </div>
      </form>
      {isEditing && (
        <section className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-bold">Peleas del evento</h2>
              <p className="text-sm text-slate-400">
                Gestiona la cartelera asociada a este evento.
              </p>
            </div>

            <Link
              to={`/admin/events/${id}/fights/create`}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-500"
            >
              <Plus size={18} />
              Añadir pelea
            </Link>
          </div>

          {loadingFights ? (
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 text-center text-slate-400">
              Cargando peleas...
            </div>
          ) : fights.length === 0 ? (
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 text-center text-slate-400">
              Este evento todavía no tiene peleas.
            </div>
          ) : (
            <div className="space-y-3">
              {fights.map((fight) => (
                <div
                  key={fight.id}
                  className="grid gap-4 rounded-xl border border-slate-800 bg-slate-950 p-4 md:grid-cols-[1fr_1fr_auto]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400">
                      <Swords size={20} />
                    </div>

                    <div>
                      <h3 className="font-semibold">{fight.name}</h3>
                      <p className="text-sm text-slate-400">
                        {fight.fight_type} · {fight.rule?.name || "Sin regla"}
                      </p>
                    </div>
                  </div>

                  <div className="text-sm text-slate-400">
                    {fight.fighters?.length
                      ? fight.fighters.map((fighter) => fighter.name).join(", ")
                      : "Sin peleadores asignados"}
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to={`/admin/fights/${fight.id}/edit`}
                      className="rounded-lg bg-slate-800 p-2 hover:bg-slate-700"
                    >
                      <Edit size={17} />
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDeleteFight(fight.id)}
                      className="rounded-lg bg-red-500/10 p-2 text-red-400 hover:bg-red-500/20"
                    >
                      <Trash size={17} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default AdminEventFormPage;
