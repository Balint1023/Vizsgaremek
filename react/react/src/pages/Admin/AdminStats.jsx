import { useState, useEffect } from "react";

const AdminStats = () => {
    const [tanarok, setTanarok] = useState([]);
    const [selectedTanar, setSelectedTanar] = useState("");
    const [stats, setStats] = useState(null);

    // Tanárok lekérése a dropdownhoz
    useEffect(() => {
        fetch("http://localhost:8000/api/tanarok", {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })
            .then(res => res.json())
            .then(data => setTanarok(data));
    }, []);

    // Statisztika lekérése, ha változik a tanár
    useEffect(() => {
        if (selectedTanar) {
            fetch(`http://localhost:8000/api/admin/stat/tanar/${selectedTanar}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            })
                .then(res => res.json())
                .then(data => setStats(data));
        }
    }, [selectedTanar]);

    return (
        <div>
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
                                    <td>{sor.atlag}</td>
                                    <td>{sor.ervenyes_valaszok_szama}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminStats;