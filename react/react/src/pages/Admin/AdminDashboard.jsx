import { Outlet, Link } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";

const AdminDashboard = () => {
    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <h2>Admin</h2>
                <nav>
                    <Link to="/admin/dashboard/kerdoivek">Kérdőívek</Link>
                    <Link to="/admin/dashboard/kerdesek">Kérdések</Link>
                    <Link to="/admin/dashboard/eredmenyek">Eredmények</Link>
                </nav>
                <LogoutButton />
            </aside>

            {/* JOBB OLDAL - DINAMIKUS TARTALOM */}
            <main className="admin-content">
                <header>
                    <h1>Minőségbiztosítási kérdőív</h1>
                </header>
                <div className="content-inner">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;