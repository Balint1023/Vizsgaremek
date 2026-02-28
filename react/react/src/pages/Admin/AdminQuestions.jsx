import React, { useState, useEffect } from 'react';

const AdminQuestions = () => {
    const [kerdesek, setKerdesek] = useState([]);
    const [tipusok, setTipusok] = useState([]);
    const [loading, setLoading] = useState(true);

    // Form állapot
    const [formData, setFormData] = useState({ id: null, leiras: '', tipus_id: '' });
    const [isEditing, setIsEditing] = useState(false);

    const token = localStorage.getItem('token');
    const API_BASE = 'http://localhost:8000/api';

    useEffect(() => {
        loadInitialData();
    }, []);

    const loadInitialData = async () => {
        setLoading(true);
        try {
            const headers = { 'Authorization': `Bearer ${token}` };

            // Típusok és kérdések lekérése párhuzamosan
            const [tRes, kRes] = await Promise.all([
                fetch(`${API_BASE}/kerdes-tipusok`, { headers }),
                fetch(`${API_BASE}/kerdesek`, { headers })
            ]);

            const tData = await tRes.json();
            const kData = await kRes.json();

            setTipusok(tData);
            setKerdesek(kData);

            // Alapértelmezett típus beállítása az új kérdéshez
            if (tData.length > 0) {
                setFormData(prev => ({ ...prev, tipus_id: tData[0].id }));
            }
        } catch (error) {
            console.error("Hiba az adatok betöltésekor:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = isEditing ? 'PUT' : 'POST';
        const url = isEditing ? `${API_BASE}/kerdesek/${formData.id}` : `${API_BASE}/kerdesek`;

        try {
            const res = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                resetForm();
                loadInitialData(); // Frissítés
            }
        } catch (error) {
            alert("Hiba a mentés során!");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Biztosan törlöd?")) return;

        try {
            await fetch(`${API_BASE}/kerdesek/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            loadInitialData();
        } catch (error) {
            alert("Hiba a törléskor!");
        }
    };

    const startEdit = (kerdes) => {
        setIsEditing(true);
        setFormData({ id: kerdes.id, leiras: kerdes.leiras, tipus_id: kerdes.tipus_id });
    };

    const resetForm = () => {
        setIsEditing(false);
        setFormData({ id: null, leiras: '', tipus_id: tipusok[0]?.id || '' });
    };

    if (loading) return <div>Betöltés folyamatban...</div>;

    return (
        <div className="admin-page">
            <h3>Kérdések Karbantartása</h3>

            {/* CRUD FORM */}
            <div className="admin-card">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Kérdés szövege..."
                        value={formData.leiras}
                        onChange={(e) => setFormData({ ...formData, leiras: e.target.value })}
                        required
                    />

                    <select
                        value={formData.tipus_id}
                        onChange={(e) => setFormData({ ...formData, tipus_id: e.target.value })}
                    >
                        {tipusok.map(t => (
                            <option key={t.id} value={t.id}>{t.megnevezes}</option>
                        ))}
                    </select>

                    <button type="submit">
                        {isEditing ? "Módosítás mentése" : "Kérdés hozzáadása"}
                    </button>
                    {isEditing && <button type="button" onClick={resetForm}>Mégse</button>}
                </form>
            </div>

            {/* ADAT TÁBLÁZAT */}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Kérdés</th>
                        <th>Típus</th>
                        <th>Műveletek</th>
                    </tr>
                </thead>
                <tbody>
                    {kerdesek.map(k => (
                        <tr key={k.id}>
                            <td>{k.id}</td>
                            <td>{k.leiras}</td>
                            <td>{k.tipus?.megnevezes}</td>
                            <td>
                                <button onClick={() => startEdit(k)}>Szerkesztés</button>
                                <button onClick={() => handleDelete(k.id)}>Törlés</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminQuestions;