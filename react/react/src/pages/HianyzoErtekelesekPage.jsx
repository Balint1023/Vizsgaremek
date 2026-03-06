import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HianyzoErtekelesek = () => {
  const navigate = useNavigate();
  const [tanarok, setTanarok] = useState([]);
  const [selectedTanarId, setSelectedTanarId] = useState("");
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
        console.log("Kérés küldése a szervernek..."); // DEBUG log
        const response = await fetch(`http://localhost:8000/api/hianyzo-ertekelesek`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });

        console.log("Válasz státusza:", response.status);
        localStorage.getItem("token") // DEBUG log

        if (response.ok) {
          const result = await response.json();
          console.log("Kapott adatok:", result); // DEBUG log
          setTanarok(result);
        } else {
          const errorData = await response.json().catch(() => ({}));
          setError(errorData.message || "Hiba történt az adatok lekérésekor.");
        }
      } catch (err) {
        console.error("Hálózati hiba:", err);
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

  if (loading) return <div className="container mt-5">Betöltés...</div>;
  if (error) return <div className="container mt-5 text-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h1>Értékelendő tanárok</h1>

      {tanarok.length === 0 ? (
        <p className="alert alert-info">Minden tanárt értékeltél már!</p>
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
            disabled={!selectedTanarId}
          >
            Értékelés indítása
          </button>
        </div>
      )}
    </div>
  );
};

export default HianyzoErtekelesek;