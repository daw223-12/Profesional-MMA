import { Crown } from "lucide-react";
import { createPremiumCheckout } from "../../api/stripe.api";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";

function PremiumPage() {
  const { isPremium } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckout() {
    setLoading(true);
    setError("");

    try {
      const response = await createPremiumCheckout();
      window.location.href = response.data.checkout_url;
    } catch {
      setError("No se pudo iniciar el pago con Stripe.");
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex flex-col items-center justify-center min-h-screen px-4 gap-6">
      <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8 flex flex-col items-center justify-center ">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-400">
          <Crown size={34} />
        </div>

        <h1 className="text-4xl font-black">Hazte Premium</h1>

        <p className="mt-4 text-slate-400">
          Accede a eventos históricos, favoritos y perfiles completos de peleadores.
        </p>

        <p className="mt-6 text-5xl font-black text-blue-400">9,99€</p>
        <p className="mt-1 text-sm text-slate-500">Pago único</p>

        {error && (
          <div className="mt-6 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-red-300">
            {error}
          </div>
        )}

        <button
          onClick={handleCheckout}
          disabled={isPremium || loading}
          className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPremium
            ? "Ya eres Premium"
            : loading
              ? "Redirigiendo a Stripe..."
              : "Pagar con Stripe"}
        </button>
      </section>
    </div>
  );
}

export default PremiumPage;