import { Link } from "react-router-dom";
import {
  Home,
  CalendarDays,
  Swords,
  Dumbbell,
  Building2,
  Users,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const ADMIN_NAV_ITEMS = [
  {
    label: "Inicio",
    path: "/",
    icon: Home,
    roles: ["super_admin", "promoter_admin", "gym_admin"],
  },
  {
    label: "Eventos",
    path: "/admin/events",
    icon: CalendarDays,
    roles: ["super_admin", "promoter_admin"],
  },
  {
    label: "Peleas",
    path: "/admin/fights",
    icon: Swords,
    roles: ["super_admin", "promoter_admin"],
  },
  {
    label: "Peleadores",
    path: "/admin/fighters",
    icon: Dumbbell,
    roles: ["super_admin", "promoter_admin", "gym_admin"],
  },
  {
    label: "Gimnasios",
    path: "/admin/gyms",
    icon: Building2,
    roles: ["super_admin", "promoter_admin", "gym_admin"],
  },
  {
    label: "Usuarios",
    path: "/admin/users",
    icon: Users,
    roles: ["super_admin"],
  },
];

function AdminHeader() {
  const { user } = useAuth();

  const visibleItems = ADMIN_NAV_ITEMS.filter((item) =>
    item.roles.includes(user?.role),
  );

  return (
    <header className="border-b border-slate-800 bg-slate-900">
      <div className="mx-auto flex flex-wrap items-center gap-4 px-4 py-4">
        <Link to="/admin" className="font-bold text-blue-500">
          Panel Administración
        </Link>

        <nav className="flex items-center gap-4">
          {visibleItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-slate-800"
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

export default AdminHeader;
