import { CheckCircle, XCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

function PaymentResultPage() {
  const location = useLocation();

  const { refreshUser } = useAuth()

  const isSuccess = location.pathname.includes("success");

  useEffect(() => {
    if (isSuccess) {
      refreshUser();
    }
  }, [isSuccess, refreshUser]);

  return (
    <div
      id="paymentResultPageContainer"
       className="mx-auto flex flex-col items-center justify-center min-h-screen px-4 gap-6"
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
          {isSuccess
            ? "Pago realizado con éxito"
            : "Pago cancelado"}
        </h1>

        <p className="mt-4 text-slate-400">
          {isSuccess
            ? "Ya puedes disfrutar de todas las funcionalidades Premium de Professional MMA."
            : "El proceso de pago ha sido cancelado. No se ha realizado ningún cargo."}
        </p>

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