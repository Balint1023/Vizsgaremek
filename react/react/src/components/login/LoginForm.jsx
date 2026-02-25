import { useState } from 'react';
import Layout from '../Layout';

const LoginForm = ({ onLoginSuccess }) => {
    const [diakId, setDiakId] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://127.0.0.1:8000/api/diak/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ diak_id: diakId }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Bejelentkezés sikeres, adatok:", data);

                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.diak));
                localStorage.setItem('role', 'diak');

                onLoginSuccess();
            } else {
                setError(data.message || 'Sikertelen bejelentkezés');
            }
        } catch (err) {
            console.error("Hiba részletei:", err);
            setError('Hiba történt a feldolgozás során.');
        }
    };

    return (
        <Layout>
            <div className="login-header">
                <h1>Minőségirányítás</h1>
                <h3>Tanulói kérdőív</h3>
            </div>

            <p className="description-text">
                Oktatási azonosítódat a diákigazolványodon találod.
                Ha szükséges, kérj segítséget osztályfőnöködtől!
            </p>

            <div className="login-body-flex">
                <form className="form-section" onSubmit={handleSubmit}>
                    <label>OM azonosító</label>
                    <input type="number" value={diakId} onChange={(e) => setDiakId(e.target.value)} required />
                    <button type="submit" className="login-btn">Bejelentkezés</button>
                </form>

                <div className="image-section">
                    <img src="diak.jpg" alt="Azonosító segédlet" />
                </div>
            </div>
        </Layout>
    );
};

export default LoginForm;