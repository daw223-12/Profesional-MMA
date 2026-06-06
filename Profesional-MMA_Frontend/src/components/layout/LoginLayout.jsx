import { Outlet } from "react-router-dom";
// import PublicHeader from "./PublicHeader";
// import Footer from "./Footer";

function PublicLayout() {
  return (
    <div id="loginLayout" className="min-h-screen bg-slate-950 text-slate-100">


     
        <Outlet />
      
    </div>
  );
}

export default PublicLayout;