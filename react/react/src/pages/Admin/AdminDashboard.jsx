import { Outlet, Link } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";

const AdminDashboard = () => {
    return (
        <div className="admin-layout">
            {/* Bal oldali menüsor */}
            <aside className="sidebar">
                <div className="sidebar-title">Admin</div>
                <nav>
                    <ul>
                        <li><Link to="/admin/dashboard/kerdoivek">Kérdőívek</Link></li>
                        <li><Link to="/admin/dashboard/kerdesek">Kérdések</Link></li>
                        <li><Link to="/admin/dashboard/eredmenyek">Eredmények</Link></li>
                    </ul>
                </nav>
                <div className="sidebar-bottom">
                    <LogoutButton />
                </div>
            </aside>

            {/* Jobb oldali tartalom */}
            <main className="content-area">
                <header>
                    <h1>Minőségbiztosítási kérdőív</h1>
                </header>

                <section className="dynamic-content">
                    <Outlet />
                </section>
            </main>
        </div>
    );
};

export default AdminDashboard;