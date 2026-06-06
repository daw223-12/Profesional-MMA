import { useState } from "react";
import LoginForm from "../../components/auth/LoginForm";
import RegisterForm from "../../components/auth/RegisterForm";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="mx-auto flex flex-col items-center justify-center min-h-screen px-4 gap-6">
        <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold">Professional MMA</h1>
        <p className="mt-2 text-slate-400">
          {isLogin ? "Accede a tu cuenta" : "Crea tu cuenta"}
        </p>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900 !p-6 flex flex-col gap-4">
        <h2 className="mb-6 text-center text-xl font-semibold">
          {isLogin ? "Iniciar sesión" : "Crear cuenta"}
        </h2>

        {isLogin ? <LoginForm /> : <RegisterForm />}
      </div>

      <div className="mt-4 text-center">
        <button onClick={() => setIsLogin(!isLogin)} className="!bg-transparent !border-0 !shadow-none p-0 text-slate-400 hover:text-blue-400">
          {isLogin
            ? "¿No tienes cuenta? Regístrate"
            : "¿Ya tienes cuenta? Inicia sesión"}
        </button>
      </div>
      <div className="mt-4 text-center">
        <a href="/" className="!bg-transparent !border-0 !shadow-none p-0 text-slate-400 hover:text-blue-400">
          Ir al home
        </a>
      </div>
    </div>
  );
}

export default AuthPage;