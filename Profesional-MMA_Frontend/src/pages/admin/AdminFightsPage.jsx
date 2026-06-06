import { Link } from "react-router-dom";
import { Edit, Plus, Swords, Trash } from "lucide-react";

const MOCK_FIGHTS = [
  {
    id: 1,
    name: "Main Event",
    event: "Professional MMA Madrid",
    type: "single",
    fighters: "Álvaro Castro vs Mario López",
  },
  {
    id: 2,
    name: "Co-Main Event",
    event: "Professional MMA Madrid",
    type: "team",
    fighters: "Team A vs Team B",
  },
];

function AdminFightsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm uppercase text-blue-400">Administración</p>
          <h1 className="text-3xl font-black">Peleas</h1>
        </div>

        <Link
          to="/admin/fights/create"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-500"
        >
          <Plus size={18} />
          Crear pelea
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <div className="hidden grid-cols-5 border-b border-slate-800 px-4 py-3 text-sm font-semibold text-slate-400 md:grid">
          <span>Pelea</span>
          <span>Evento</span>
          <span>Tipo</span>
          <span>Peleadores</span>
          <span>Acciones</span>
        </div>

        {MOCK_FIGHTS.map((fight) => (
          <div
            key={fight.id}
            className="grid gap-3 border-b border-slate-800 px-4 py-4 last:border-b-0 md:grid-cols-5 md:items-center"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400">
                <Swords size={20} />
              </div>

              <span className="font-semibold">{fight.name}</span>
            </div>

            <span className="text-sm text-slate-400">{fight.event}</span>
            <span className="text-sm text-slate-400">{fight.type}</span>
            <span className="text-sm text-slate-400">{fight.fighters}</span>

            <div className="flex gap-2">
              <Link
                to={`/admin/fights/${fight.id}/edit`}
                className="rounded-lg bg-slate-800 p-2 hover:bg-slate-700"
              >
                <Edit size={17} />
              </Link>

              <button className="rounded-lg bg-red-500/10 p-2 text-red-400 hover:bg-red-500/20">
                <Trash size={17} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminFightsPage;