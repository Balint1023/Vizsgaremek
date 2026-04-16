import { useState, useEffect } from "react";
import "./AdminStats.css";
import Loading from "../../components/Loading";

const AdminStats = () => {
    const [tanarok, setTanarok] = useState([]);
    const [selectedTanar, setSelectedTanar] = useState("");
    const [stats, setStats] = useState(null);

    // EZ HIÁNYZOTT:
    const [loading, setLoading] = useState(true);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setLoading(true); // Lekérés indításakor bekapcsoljuk
        fetch("http://localhost:8000/api/tanarok", {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })
            .then(res => res.json())
            .then(data => {
                setTanarok(data);
                setLoading(false); // Adatok megérkeztekor kikapcsoljuk
            })
            .catch(err => {
                console.error(err);
                setLoading(false); // Hiba esetén is kapcsoljuk ki, különben örökké pörög
            });
    }, []);

    useEffect(() => {
        if (selectedTanar) {
            // Itt opcionálisan bekapcsolhatsz egy kisebb töltést, 
            // de az egész oldalt már ne takarjuk le
            fetch(`http://localhost:8000/api/admin/stat/tanar/${selectedTanar}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            })
                .then(res => res.json())
                .then(data => setStats(data));
        }
    }, [selectedTanar]);

    return (
        <div>
            {loading ? (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: isMobile ? '50%' : 'calc(50% + 125px)',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 9999,
                    pointerEvents: 'none'
                }}>
                    <Loading />
                </div>
            ) : (
                <div className="admin-container">
                    <div className="selector-container">
                        <label>Tanár kiválasztása:</label>
                        <select
                            value={selectedTanar}
                            onChange={(e) => setSelectedTanar(e.target.value)}
                        >
                            <option value="">-- Válassz tanárt --</option>
                            {tanarok.map(t => (
                                <option key={t.id} value={t.id}>{t.nev}</option>
                            ))}
                        </select>
                    </div>

                    {stats && (
                        <div className="stats-results">
                            <h2>{stats.tanar} statisztikái</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Kérdés</th>
                                        <th>Átlag</th>
                                        <th>Kitöltések száma</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.statisztika.map((sor, i) => (
                                        <tr key={i}>
                                            <td>{sor.kerdes}</td>
                                            <td id="atlag">{sor.atlag}</td>
                                            <td id="valaszok">{sor.ervenyes_valaszok_szama}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminStats;