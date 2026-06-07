import {
  CalendarDays,
  Dumbbell,
  Shield,
<<<<<<< HEAD
=======
  // Swords,
>>>>>>> 374194b824ad75f3d6f2dc5e1e7c9ed349e21efb
  Users,
  Building2,
  Trophy,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ADMIN_CARDS = [
  {
    title: "Eventos",
    description: "Crear, editar y publicar eventos de MMA.",
    path: "/admin/events",
    icon: CalendarDays,
    roles: ["super_admin", "promoter_admin"],
  },
  // {
  //   title: "Peleas",
  //   description: "Gestionar la cartelera y sus peleadores.",
  //   path: "/admin/fights",
  //   icon: Swords,
  //   roles: ["super_admin", "promoter_admin"],
  // },
  {
    title: "Peleadores",
    description: "Crear y actualizar perfiles de peleadores.",
    path: "/admin/fighters",
    icon: Dumbbell,
    roles: ["super_admin", "promoter_admin", "gym_admin"],
  },
  {
    title: "Gimnasios",
    description: "Consultar gimnasios registrados.",
    path: "/admin/gyms",
    icon: Building2,
    roles: ["super_admin", "promoter_admin"],
<<<<<<< HEAD
  },
  {
    title: "Promotoras",
    description: "Gestionar promotoras registradas.",
    path: "/admin/promotions",
    icon: Trophy,
    roles: ["super_admin"],
=======
>>>>>>> 374194b824ad75f3d6f2dc5e1e7c9ed349e21efb
  },
  {
    title: "Usuarios",
    description: "Gestionar usuarios y permisos.",
    path: "/admin/users",
    icon: Users,
    roles: ["super_admin"],
  },
  
  {
    title: "Reglas",
    description: "Consultar y crear reglas de combate.",
    path: "/admin/rules",
    icon: Shield,
    roles: ["super_admin"],
  },
];

function AdminDashboardPage() {
  const { user } = useAuth();

  const visibleCards = ADMIN_CARDS.filter((card) =>
    card.roles.includes(user?.role)
  );

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 md:p-10">
        <p className="mb-3 text-sm font-semibold uppercase text-blue-400">
          Panel de administración
        </p>

        <h1 className="text-4xl font-black md:text-5xl">
          Bienvenido, {user?.name}
        </h1>

        <p className="mt-4 max-w-2xl text-slate-400">
          Desde aquí puedes gestionar los recursos permitidos según tu tipo de
          administrador.
        </p>

        <div className="mt-6 inline-flex rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
          Rol: {user?.role}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleCards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.title}
              to={card.path}
              className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-blue-500"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400 group-hover:bg-blue-600 group-hover:text-white">
                <Icon size={24} />
              </div>

              <h2 className="text-xl font-bold">{card.title}</h2>

              <p className="mt-2 text-sm text-slate-400">
                {card.description}
              </p>
            </Link>
          );
        })}
      </section>
    </div>
  );
}

export default AdminDashboardPage;