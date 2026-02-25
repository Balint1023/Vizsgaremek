import './Layout.css';

const Layout = ({ children }) => {
    return (
        <div className="app-container">
            <main className="content">
                {children}
            </main>
            <footer>
                <p>© 2026 Vizsgaremek - Minden jog fenntartva</p>
            </footer>
        </div>
    );
};

export default Layout;