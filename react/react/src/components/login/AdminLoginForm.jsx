import { useState } from 'react';
import "./AdminLoginForm.css";

const AdminLoginForm = ({ onLoginSuccess }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://127.0.0.1:8000/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('role', 'admin');
                onLoginSuccess();
            } else {
                setError(data.message || 'Sikertelen bejelentkezés');
            }
        } catch (err) {
            setError('Hálózati hiba történt.');
        }
    };

    return (
        <div className="admin-login-wrapper">
            <form onSubmit={handleSubmit} className="admin-login-form">
                <h2>Admin Bejelentkezés</h2>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <input
                    name="username"
                    type="text"
                    placeholder="Felhasználónév"
                    onChange={handleChange}
                    required
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Jelszó"
                    onChange={handleChange}
                    required
                />

                <button type="submit">Bejelentkezés</button>
            </form>

            <img src="/logo.png" alt="logo" className="login-logo" />
        </div>
    );
};

export default AdminLoginForm;