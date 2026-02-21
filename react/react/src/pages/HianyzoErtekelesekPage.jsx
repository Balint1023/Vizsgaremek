import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HianyzoErtekelesek = () => {
  const navigate = useNavigate();
  const [tanarok, setTanarok] = useState([]);
  const [selectedTanarId, setSelectedTanarId] = useState(""); // Kiválasztott tanár ID-ja
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTanarok = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Bejelentkezés szükséges.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:8000/api/hianyzo-ertekelesek`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setTanarok(data);
        } else {
          setError("Hiba történt az adatok lekérésekor.");
        }
      } catch {
        setError("Nem sikerült kapcsolódni a szerverhez.");
      } finally {
        setLoading(false);
      }
    };

    fetchTanarok();
  }, []);

  const handleStartErtekeles = () => {
    if (selectedTanarId) {
      navigate(`/tanar/${selectedTanarId}/ertekeles`);
    }
  };

  if (loading) return <p className="container mt-5">Betöltés...</p>;
  if (error) return <p className="container mt-5 text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h1>Értékelendő tanárok</h1>

      {tanarok.length === 0 ? (
        <p>Minden tanárt értékeltél már!</p>
      ) : (
        <div className="card p-4 shadow-sm">
          <div className="mb-3">
            <label htmlFor="tanarSelect" className="form-label">Válassz egy tanárt az értékeléshez:</label>
            <select
              id="tanarSelect"
              className="form-select"
              value={selectedTanarId}
              onChange={(e) => setSelectedTanarId(e.target.value)}
            >
              <option value="">-- Válassz tanárt --</option>
              {tanarok.map((tanar) => (
                <option key={tanar.id} value={tanar.id}>
                  {tanar.nev}
                </option>
              ))}
            </select>
          </div>

          <button
            className="btn btn-primary w-100"
            onClick={handleStartErtekeles}
            disabled={!selectedTanarId} // Csak akkor kattintható, ha van választott tanár
          >
            Értékelés indítása
          </button>
        </div>
      )}
    </div>
  );
};

export default HianyzoErtekelesek;