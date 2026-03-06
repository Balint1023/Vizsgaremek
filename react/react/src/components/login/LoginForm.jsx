import { useState, useEffect } from 'react';
import Layout from '../Layout';

const LoginForm = ({ onLoginSuccess }) => {
    const [diakId, setDiakId] = useState('');
    const [error, setError] = useState('');
    const [isAktiv, setIsAktiv] = useState(true);
    const [loading, setLoading] = useState(true);

    // ÚJ: Ez vezérli az animáció indítását
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        const checkStatus = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/kerdoiv-statusz-publikus');
                const data = await response.json();
                setIsAktiv(data.aktiv);
            } catch (err) {
                console.error("Nem sikerült lekérni a státuszt:", err);
                setIsAktiv(false);
            } finally {
                setLoading(false);
            }
        };
        checkStatus();
    }, []);

    // Segédfüggvény a hiba kezeléséhez animációval
    const triggerError = (message) => {
        setError(message);
        setIsFadingOut(false); // Reseteljük az animációt

        // 1. lépés: Megjelenik a popup, várunk 3.5 másodpercet
        setTimeout(() => {
            setIsFadingOut(true); // 2. lépés: Hozzáadjuk a .fade-out osztályt (elindul az 0.5s-os animáció)

            // 3. lépés: Megvárjuk az animáció végét (0.5s), és csak utána töröljük az állapotot
            setTimeout(() => {
                setError('');
                setIsFadingOut(false);
            }, 500);
        }, 3500);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAktiv) return;
        setError('');
        setIsFadingOut(false);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/diak/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ diak_id: diakId}),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('role', "diak");
                onLoginSuccess();
            } else {
                triggerError(data.message || 'Érvénytelen oktatási azonosító!');
            }
        } catch (err) {
            triggerError('Szerverhiba történt. Próbálja újra később!');
        }
    };

    if (loading) return <Layout><p>Betöltés...</p></Layout>;

    return (
        <Layout>
            {/* Itt a kulcs: dinamikusan kapja meg a fade-out osztályt */}
            {error && (
                <div className={`error-popup ${isFadingOut ? 'fade-out' : ''}`}>
                    <div className="error-popup-content">
                        <span>{error}</span>
                    </div>
                </div>
            )}

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

                    {!isAktiv && (
                        <div className="status-closed-msg">
                            A kérdőív jelenleg nem elérhető!
                        </div>
                    )}

                    <input
                        type="number"
                        value={diakId}
                        onChange={(e) => setDiakId(e.target.value)}
                        required
                        disabled={!isAktiv}
                        className={error ? 'input-error' : ''}
                        placeholder="Adja meg az azonosítót"
                    />

                    <button
                        type="submit"
                        className="login-btn"
                        disabled={!isAktiv}
                    >
                        {isAktiv ? 'Bejelentkezés' : 'Nem elérhető'}
                    </button>
                </form>

                <div className="image-section">
                    <img src="diak.jpg" alt="Segédlet" />
                </div>
            </div>
        </Layout>
    );
};

export default LoginForm;