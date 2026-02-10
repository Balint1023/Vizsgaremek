import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HianyzoErtekelesek = () => {
  const navigate = useNavigate();
  const [tanarok, setTanarok] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTanarok = async () => {
      const token = localStorage.getItem("token"); // Token lekérése

      if (!token) {
        setError("Bejelentkezés szükséges.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:8000/api/hianyzo-ertekelesek`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Itt használjuk a változót
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
  }, []); // Nem kell az [id] függőség, mert nincs ID az URL-ben

  if (loading) return <p className="container mt-5">Betöltés...</p>;
  if (error) return <p className="container mt-5 text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h1>Értékelendő tanárok</h1>
      {tanarok.length === 0 ? (
        <p>Nincs értékelhető tanár.</p>
      ) : (
        <ul className="list-group shadow-sm">
          {tanarok.map((tanar) => (
            <li key={tanar.id} className="list-group-item d-flex justify-content-between align-items-center">
              {tanar.nev}
              <button
                className="btn btn-primary btn-sm"
                // Itt már az új, diákId nélküli útvonalat használjuk
                onClick={() => navigate(`/tanar/${tanar.id}/ertekeles`)}
              >
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
