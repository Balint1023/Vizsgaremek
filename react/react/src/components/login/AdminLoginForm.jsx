import { useState } from 'react';
import "./AdminLoginForm.css";
import "../Layout.css"
import Layout from '../Layout';
import Loading from '../Loading';
import '../Loading.css';

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
        <Layout>
            <div className="admin-login-wrapper">
                <div className="admin-login-form-container">
                    <h1>Admin Bejelentkezés</h1>

                    <div className="login-content">
                        <form onSubmit={handleSubmit} className="admin-login-form">
                            {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}

                            <div className="input-group">
                                <label>Felhasználónév</label>
                                <input
                                    name="username"
                                    type="text"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>Jelszó</label>
                                <input
                                    name="password"
                                    type="password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button type="submit">Bejelentkezés</button>
                        </form>

                        <img src="/mathiasz_logo.png" alt="logo" className="login-logo" />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminLoginForm;