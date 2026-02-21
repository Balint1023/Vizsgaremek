import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const token = localStorage.getItem('token');

        try {
            await fetch('http://127.0.0.1:8000/api/admin/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
            });
        } catch (error) {
            console.error("Hiba a szerveroldali kijelentkezéskor:", error);
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('user');
            navigate('/admin/login');
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="btn btn-danger"
            style={{ cursor: 'pointer' }}
        >
            Kijelentkezés
        </button>
    );
};

export default LogoutButton;