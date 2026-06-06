import { Crown, LogOut, Menu, Shield, User, LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PublicHeader() {
  const { user, isAuthenticated, isAdmin, isPremium, logout } = useAuth();

  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);


    try {
      await logout();
      navigate("/login");
    } finally {
      setLoggingOut(false);
    };
  }



  return (

    <header id="publicHeader" className="grid grid-cols-[5%_90%_5%] border-b border-slate-800 bg-slate-900">
      <div id="leftSpacer" />
      <div className="flex h-16 items-center justify-between pl-8 pr-8">

        <Link to="/" className="flex items-center gap-3">
          <img src="/icono-guantilla.png" className="h-10 w-10" />
          <span className="font-bold text-blue-500">Professional MMA</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link to="/">Eventos</Link>
          <Link to="/past-events">Históricos</Link>
          <Link to="/fighters">Peleadores</Link>
          <Link to="/favorites">Favoritos</Link>

          {/* {isAuthenticated && (
            <>
              <Link to="/favorites">Favoritos</Link>
            </>
          )} */}

          {isAdmin && (
            <Link to="/admin" className="flex items-center gap-1 text-blue-400">
              <Shield size={16} />
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {isPremium ? (
            <span className="hidden items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium hover:bg-blue-500 sm:flex">
              <Crown size={16} />
              Premium
            </span>
          ) : (
            <Link
              to="/premium"
              className="hidden items-center gap-2 rounded-lg border border-blue-500 px-3 py-2 text-sm text-blue-400 sm:flex"
            >
              Get Premium
            </Link>
          )}

          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-slate-800 sm:flex"
              >
                <User size={18} />
                {user?.name}
              </Link>

              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="rounded-lg p-2 hover:bg-slate-800 disabled:opacity-50"
                title="Cerrar sesión"
              >
                {loggingOut ? (
                  <LoaderCircle size={20} className="animate-spin" />
                ) : (
                  <LogOut size={20} />
                )}
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium hover:bg-blue-500"
            >
              Login
            </Link>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 hover:bg-slate-800 md:hidden"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>
      <div id="leftSpacer" />
      {mobileMenuOpen && (
        <div className="border-t border-slate-800 bg-slate-900 md:hidden">
          <nav className="flex flex-col p-4">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-3 hover:bg-slate-800"
            >
              Eventos
            </Link>

            <Link
              to="/past-events"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-3 hover:bg-slate-800"
            >
              Históricos
            </Link>

            <Link
              to="/fighters"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-3 hover:bg-slate-800"
            >
              Peleadores
            </Link>

            <Link
              to="/favorites"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-3 hover:bg-slate-800"
            >
              Favoritos
            </Link>

            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-blue-400 hover:bg-slate-800"
              >
                Administración
              </Link>
            )}

            <hr className="my-3 border-slate-800" />

            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-3 hover:bg-slate-800"
                >
                  Mi perfil
                </Link>

                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="rounded-lg px-3 py-3 text-left hover:bg-slate-800"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-3 hover:bg-slate-800"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default PublicHeader;
