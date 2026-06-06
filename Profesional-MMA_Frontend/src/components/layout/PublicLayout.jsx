import { Outlet } from "react-router-dom";
import PublicHeader from "./PublicHeader";
import Footer from "./Footer";

function PublicLayout() {
  return (
    <div
      id="publicLayout"
      className="min-h-screen bg-slate-950 text-slate-100 grid-cols-1 px-8"
    >
        {/* <div className="mx-auto flex min-h-screen w-full max-w-400 flex-col px-4 py-4"> */}
        <PublicHeader />

        <Outlet />

        <Footer />
      {/* </div> */}
    </div>
  );
}

export default PublicLayout;
