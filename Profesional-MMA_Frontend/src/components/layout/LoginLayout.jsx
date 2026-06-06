import { Outlet } from "react-router-dom";
// import PublicHeader from "./PublicHeader";
// import Footer from "./Footer";

function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">


      <main className="mx-auto min-h-[calc(100vh-160px)] w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      
    </div>
  );
}

export default PublicLayout;