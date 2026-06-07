import { CheckCircle, XCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

function PaymentResultPage() {
  const location = useLocation();
  const { refreshUser } = useAuth();

  const [checkingPremium, setCheckingPremium] = useState(false);

  const isSuccess = location.pathname.includes("success");

  useEffect(() => {
    if (!isSuccess) return;

    let cancelled = false;

    async function checkPremiumStatus() {
      setCheckingPremium(true);

      for (let i = 0; i < 5; i++) {
        if (cancelled) return;

        const updatedUser = await refreshUser();

        if (updatedUser?.is_premium === true) {
          break;
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      if (!cancelled) {
        setCheckingPremium(false);
      }
    }

    checkPremiumStatus();

    return () => {
      cancelled = true;
    };
  }, [isSuccess, refreshUser]);

  return (
    <div
      id="paymentResultPageContainer"
      className="mx-auto flex min-h-screen flex-col items-center justify-center gap-6 px-4"
    >
      <div id="profilePageContent" className="mt-8 w-full max-w-7xl space-y-10">
        <div className="w-full rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center">
          <div className="mb-6 flex justify-center">
            {isSuccess ? (
              <CheckCircle size={72} className="text-green-500" />
            ) : (
              <XCircle size={72} className="text-red-500" />
            )}
          </div>

          <h1 className="text-4xl font-black">
            {isSuccess ? "Pago realizado con éxito" : "Pago cancelado"}
          </h1>

          <p className="mt-4 text-slate-400">
            {isSuccess
              ? "Ya puedes disfrutar de todas las funcionalidades Premium de Professional MMA."
              : "El proceso de pago ha sido cancelado. No se ha realizado ningún cargo."}
          </p>

          {checkingPremium && (
            <p className="mt-4 text-sm text-blue-400">
              Actualizando estado Premium...
            </p>
          )}

          <Link
            to="/"
            className="mt-8 inline-flex rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PaymentResultPage;