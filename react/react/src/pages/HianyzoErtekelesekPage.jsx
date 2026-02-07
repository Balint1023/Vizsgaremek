import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const HianyzoErtekelesek = () => {
    const { id } = useParams();
    const [tanarok, setTanarok] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTanarok = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await fetch(`http://localhost:8000/api/diak/${id}/hianyzo-ertekelesek`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setTanarok(data);
                } else if (response.status === 403) {
                    setError('Nincs jogosultságod megtekinteni ezeket az adatokat.');
                } else {
                    setError('Hiba történt az adatok lekérésekor.');
                }
            } catch (err) {
                setError('Nem sikerült kapcsolódni a szerverhez.');
            } finally {
                setLoading(false);
            }
        };

        fetchTanarok();
    }, [id]);

    if (loading) return <p>Betöltés...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div className="container">
            <h1>Értékelendő tanárok</h1>
            {tanarok.length === 0 ? (
                <p>Nincs értékelhető tanár.</p>
            ) : (
                <ul className="list-group">
                    {tanarok.map(tanar => (
                        <li key={tanar.id} className="list-group-item d-flex justify-content-between align-items-center">
                            {tanar.nev}
                            <button className="btn btn-primary btn-sm">
                                Értékelés indítása
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default HianyzoErtekelesek;