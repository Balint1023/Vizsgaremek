import { Outlet, NavLink, useLocation } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";
import { useState, useEffect } from "react";
import * as Icon from 'react-bootstrap-icons';
import "./AdminDashboard.css"

const AdminDashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return (
        <div className="admin-layout">
            <aside className={`admin-sidebar ${isOpen ? "open" : ""}`}>
                <article>
                    <h1><Icon.Person color="white" style={{ marginRight: '8px' }} />Admin</h1>
                    <nav>
                        <NavLink
                            to="/admin/dashboard/kerdoivek"
                            className={({ isActive }) => "menu-item" + (isActive ? " active" : "")}
                        >
                            <Icon.House color="white" style={{ marginRight: '8px' }} />
                            Kérdőívek
                        </NavLink>

                        <NavLink to="/admin/dashboard/kerdesek">
                            <Icon.QuestionSquare color="white" style={{ marginRight: '8px' }} />
                            Kérdések
                        </NavLink>

                        <NavLink to="/admin/dashboard/eredmenyek">
                            <Icon.Clipboard color="white" style={{ marginRight: '8px' }} />
                            Eredmények
                        </NavLink>
                    </nav>
                </article>

                <article className="buttonArticle">
                    <LogoutButton />
                </article>
            </aside>

            {/* JOBB OLDAL - DINAMIKUS TARTALOM */}
            <aside className="admin-content">
                <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
                    ☰
                </button>
                <div className="content-inner">
                    <Outlet />
                </div>
            </aside>
        </div>
    );
};

export default AdminDashboard;