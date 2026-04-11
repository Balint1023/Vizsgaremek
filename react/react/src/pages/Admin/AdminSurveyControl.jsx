import React, { useState, useEffect } from 'react';
import "./AdminSurveyControl.css";

const AdminSurveyControl = () => {
    const [isActive, setIsActive] = useState(false);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    const token = localStorage.getItem('token');
    const API_URL = 'http://localhost:8000/api/admin/kerdoiv-statusz';

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await fetch(API_URL, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                setIsActive(data.aktiv);
            } catch (error) {
                console.error("Hiba a státusz lekérésekor:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStatus();
    }, [token]);

    const handleToggle = async (newStatus) => {
        setMessage('Frissítés...');
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ aktiv: newStatus })
            });

            if (response.ok) {
                setIsActive(newStatus);
                setMessage(newStatus ? 'A kérdőív elindult!' : 'A kérdőív lezárva.');
            } else {
                setMessage('Hiba történt a mentés során.');
            }
        } catch (error) {
            setMessage('Hálózati hiba történt.');
        }

        setTimeout(() => setMessage(''), 3000);
    };

    if (loading) return <div>Állapot ellenőrzése...</div>;

    return (
        <div className="survey-control-card">
            <h2>Kérdőív menedzsment</h2>

            <div className="status-display">
                <p>Jelenlegi állapot:
                    <span style={{
                        color: isActive ? 'green' : 'red',
                        fontWeight: 'bold',
                        marginLeft: '10px'
                    }}>
                        {isActive ? "NYITVA (Diákok beléphetnek)" : "ZÁRVA (Bejelentkezés letiltva)"}
                    </span>
                </p>
            </div>

            <div className="button-group">
                <button
                    onClick={() => handleToggle(true)}
                    disabled={isActive}
                    className="btn-start"
                >
                    Kérdőív INDÍTÁSA
                </button>

                <button
                    onClick={() => handleToggle(false)}
                    disabled={!isActive}
                    className="btn-stop"
                >
                    Kérdőív LEZÁRÁSA
                </button>
            </div>

            {message && <div className="feedback-message">{message}</div>}
        </div>
    );
};

export default AdminSurveyControl;