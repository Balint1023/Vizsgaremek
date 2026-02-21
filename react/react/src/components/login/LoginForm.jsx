import { useState } from 'react';

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
        <form onSubmit={handleSubmit} className="login-form">
            <h2>Diák Bejelentkezés</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input
                type="number"
                placeholder="Oktatási azonosító"
                value={diakId}
                onChange={(e) => setDiakId(e.target.value)}
                required
            />
            <button type="submit">Belépés</button>
        </form>
    );
};

export default LoginForm;