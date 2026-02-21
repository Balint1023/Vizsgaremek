import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ErtekelesPage = () => {
    const { tanarId } = useParams();
    const navigate = useNavigate();

    const [adatok, setAdatok] = useState(null);
    const [valaszok, setValaszok] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchKerdesek = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`http://localhost:8000/api/tanar/${tanarId}/kerdesek`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setAdatok(data);

                    const alapValaszok = {};
                    data.kerdesek.forEach(k => { alapValaszok[k.id] = 0; });
                    setValaszok(alapValaszok);
                } else {
                    setError('Nem sikerült betölteni a kérdéseket.');
                }
            } catch {
                setError('Hiba a szerverrel való kapcsolatban.');
            } finally {
                setLoading(false);
            }
        };
        fetchKerdesek();
    }, [tanarId]);

    const handleRadioChange = (kerdesId, pont) => {
        setValaszok(prev => ({ ...prev, [kerdesId]: parseInt(pont) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        const token = localStorage.getItem('token');

        const payload = {
            valaszok: Object.keys(valaszok).map(id => ({
                kerdes_id: parseInt(id),
                pont: valaszok[id]
            }))
        };

        try {
            const response = await fetch(`http://localhost:8000/api/tanar/${tanarId}/ertekeles`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert('Értékelés sikeresen mentve!');
                navigate('/hianyzo-ertekelesek');
            } else {
                alert('Hiba történt a mentés során.');
            }
        } catch {
            alert('Hálózati hiba történt.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="container mt-5">Betöltés...</div>;
    if (error) return <div className="container mt-5 text-danger">{error}</div>;

    return (
        <div className="container mt-4">
            <h1>Tanár értékelése</h1>
            <form onSubmit={handleSubmit}>
                {adatok.kerdesek.map((kerdes) => (
                    <div key={kerdes.id} className="card mb-3 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">{kerdes.leiras}</h5>
                            <div className="d-flex flex-wrap gap-3">
                                {adatok.valaszlehetosegek.map((v) => (
                                    <div key={v.pont} className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name={`kerdes-${kerdes.id}`}
                                            id={`q-${kerdes.id}-p-${v.pont}`}
                                            checked={valaszok[kerdes.id] === v.pont}
                                            onChange={() => handleRadioChange(kerdes.id, v.pont)}
                                        />
                                        <label className="form-check-label" htmlFor={`q-${kerdes.id}-p-${v.pont}`}>
                                            {v.szoveg}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
                <button type="submit" className="btn btn-success btn-lg mb-5" disabled={saving}>
                    {saving ? 'Mentés...' : 'Értékelés beküldése'}
                </button>
            </form>
        </div>
    );
};

export default ErtekelesPage;