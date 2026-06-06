import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function RegisterForm() {
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const [error, setError] = useState("");

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (form.password !== form.passwordConfirmation) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      await register(
        form.name,
        form.email,
        form.password,
        form.passwordConfirmation
      );

      navigate("/");
    } catch  {
      setError("No se pudo crear la cuenta. Revisa los datos.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div>
        <label className="mb-1 block text-sm text-slate-300">Nombre</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 outline-none focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-slate-300">Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 outline-none focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-slate-300">Contraseña</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 outline-none focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-slate-300">
          Repetir contraseña
        </label>
        <input
          name="passwordConfirmation"
          type="password"
          value={form.passwordConfirmation}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 outline-none focus:border-blue-500"
          required
        />
      </div>

      <button
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold hover:bg-blue-500 disabled:opacity-60"
      >
        {loading ? "Creando..." : "Crear cuenta"}
      </button>
    </form>
  );
}

export default RegisterForm;