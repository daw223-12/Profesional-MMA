import { Routes, Route, Navigate } from "react-router-dom";

import PublicLayout from "../components/layout/PublicLayout";
import AdminLayout from "../components/layout/AdminLayout";
import LoginLayout from "../components/layout/LoginLayout";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";
// import PremiumRoute from "./PremiumRoute";

import HomePage from "../pages/public/HomePage";
import AuthPage from "../pages/public/AuthPage";
import EventDetailPage from "../pages/public/EventDetailPage";
import PastEventsPage from "../pages/public/PastEventsPage";
import FightersPage from "../pages/public/FightersPage";
import FavoritesPage from "../pages/public/FavoritesPage";
import ProfilePage from "../pages/public/ProfilePage";
import PremiumPage from "../pages/public/PremiumPage";

import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminEventsPage from "../pages/admin/AdminEventsPage";
import AdminEventFormPage from "../pages/admin/AdminEventFormPage";
import AdminFightersPage from "../pages/admin/AdminFightersPage";
import AdminFighterFormPage from "../pages/admin/AdminFighterFormPage";
import AdminFightsPage from "../pages/admin/AdminFightsPage";
import AdminFightFormPage from "../pages/admin/AdminFightFormPage";
import AdminGymsPage from "../pages/admin/AdminGymsPage";
import AdminGymFormPage from "../pages/admin/AdminGymFormPage";
import AdminPromotionsPage from "../pages/admin/AdminPromotionsPage";
import AdminPromotionFormPage from "../pages/admin/AdminPromotionFormPage";
import AdminUsersPage from "../pages/admin/AdminUsersPage";
import AdminUserFormPage from "../pages/admin/AdminUserFormPage";
import AdminRulesPage from "../pages/admin/AdminRulesPage";
import AdminRuleFormPage from "../pages/admin/AdminRuleFormPage";

function AppRouter() {
  return (
    <Routes>
      {/* Rutas publicas (No te deja entrar si estas loggeado) */}
      <Route element={<PublicRoute />}>
        <Route element={<LoginLayout />}>
          <Route path="/login" element={<AuthPage />} />
        </Route>
      </Route>

      {/* Rutas sin restricciones */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/events/:id" element={<EventDetailPage />} />
        {/* <Route path="/login" element={<AuthPage />} /> */}
      </Route>

      {/* Rutas privadas (Solo te deja entrar si estas registrado) */}
      <Route element={<PrivateRoute />}>
        <Route element={<PublicLayout />}>
          <Route path="/past-events" element={<PastEventsPage />} /> 
          <Route path="/fighters" element={<FightersPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/premium" element={<PremiumPage />} />
        </Route>
      </Route>

      {/* <Route path="/past-events" element={<PremiumRoute><PastEventsPage /></PremiumRoute>} />
      <Route path="/fighters" element={<PremiumRoute><FightersPage /></PremiumRoute>} />
      <Route path="/favorites" element={<PremiumRoute><FavoritesPage /></PremiumRoute>} /> */}

      {/* SuperAdmin acceso a todo */}
      {/* GymAdmin acceso fighters gym */}
      {/* promoter_admin Todo menos users */}
      <Route element={<PrivateRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />


          {/* Rutas para todos los roles */}
          <Route element={
            <RoleRoute allowedRoles={["gym_admin", "promoter_admin", "super_admin"]} />}>
            <Route path="fighters" element={<AdminFightersPage />} />
            <Route path="fighters/create" element={<AdminFighterFormPage />} />
            <Route path="fighters/:id/edit" element={<AdminFighterFormPage />} />

            <Route path="fights" element={<AdminFightsPage />} />
            <Route path="events/:eventId/fights/create" element={<AdminFightFormPage />} />
            <Route path="fights/:id/edit" element={<AdminFightFormPage />} />

            <Route path="gyms" element={<AdminGymsPage />} />

            <Route path="gyms/create" element={<AdminGymFormPage />} />

            <Route path="gyms/:id/edit" element={<AdminGymFormPage />} />
          </Route>
          {/* Rutas para promoter_admin y super_admin */}
          <Route element={
            <RoleRoute allowedRoles={["promoter_admin", "super_admin"]} />}>
            <Route path="events" element={<AdminEventsPage />} />
            <Route path="events/create" element={<AdminEventFormPage />} />
            <Route path="events/:id/edit" element={<AdminEventFormPage />} />

            <Route path="promotions" element={<AdminPromotionsPage />} />

            <Route path="promotions/create" element={<AdminPromotionFormPage />} />

            <Route path="promotions/:id/edit" element={<AdminPromotionFormPage />} />
            <Route path="rules" element={<AdminRulesPage />} />

            <Route path="rules/create" element={<AdminRuleFormPage />} />

            <Route path="rules/:id/edit" element={<AdminRuleFormPage />} />
          </Route>
          {/* Rutas para  super_admin */}
          <Route element={
            <RoleRoute allowedRoles={["super_admin"]} />}>
            <Route path="users" element={<AdminUsersPage />} />

            <Route path="users/create" element={<AdminUserFormPage />} />

            <Route path="users/:id/edit" element={<AdminUserFormPage />} />
          </Route>

        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRouter;