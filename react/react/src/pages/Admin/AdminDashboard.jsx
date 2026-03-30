import { Outlet, NavLink } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";
import * as Icon from 'react-bootstrap-icons';
import "./AdminDashboard.css"

const AdminDashboard = () => {
    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <article>
                    <h1><Icon.Person color="white" style={{ marginRight: '8px' }} />Admin</h1>
                    <nav>
                        <NavLink to="/admin/dashboard/kerdoivek" className={({ isActive }) => "menu-item" + (isActive ? " active" : "")} ><Icon.House color="white" style={{ marginRight: '8px', }} />Kérdőívek</NavLink>
                        <NavLink to="/admin/dashboard/kerdesek"><Icon.QuestionSquare color="white" style={{ marginRight: '8px' }} />Kérdések</NavLink>
                        <NavLink to="/admin/dashboard/eredmenyek"><Icon.Clipboard color="white" style={{ marginRight: '8px' }} />Eredmények</NavLink>
                    </nav>
                </article>
                <article className="buttonArticle">
                    <LogoutButton />
                </article>
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