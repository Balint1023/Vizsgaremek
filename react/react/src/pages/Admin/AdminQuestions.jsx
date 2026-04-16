import React, { useState, useEffect } from 'react';
import './AdminQuestions.css';
import Loading from "../../components/Loading";

const AdminQuestions = () => {
    const [kerdesek, setKerdesek] = useState([]);
    const [tipusok, setTipusok] = useState([]);
    const [loading, setLoading] = useState(true);

    // Form állapot
    const [formData, setFormData] = useState({ id: null, leiras: '', tipus_id: '' });
    const [isEditing, setIsEditing] = useState(false);

    const token = localStorage.getItem('token');
    const API_BASE = 'http://localhost:8000/api';

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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

    return (
        <div className="admin-page">
            {loading ? (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    /* HA MOBIL: 50%, HA ASZTALI: eltolva a sidebarral */
                    left: isMobile ? '50%' : 'calc(50% + 125px)',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 9999,
                    pointerEvents: 'none'
                }}>
                    <Loading />
                </div>
            ) : (
                <>
                    <h3>Új Kérdés</h3>

                    <div className="admin-card">
                        <form onSubmit={handleSubmit}>
                            <textarea
                                className="kerdes-textarea"
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

                            <div className='putButtons'>
                                <button type="submit" className='submitNewQuestion'>
                                    {isEditing ? "Mentés" : "Hozzáadás"}
                                </button>
                                {isEditing && (
                                    <button type="button" onClick={resetForm} className='cancelPutBtn'>
                                        Mégse
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
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
                                    <td>{k.id}.</td>
                                    <td>{k.leiras}</td>
                                    <td>{k.tipus?.megnevezes}</td>
                                    <td className='tdButtons'>
                                        <button onClick={() => startEdit(k)} className='modificateBtn'>Szerkesztés</button>
                                        <button onClick={() => handleDelete(k.id)} className='cancelBtn'>Törlés</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default AdminQuestions;