import React, { useState, useEffect, useContext } from 'react';
import { HitelelesKontextus } from '../kontextus/HitelelesKontextus';
import { getErtekelesKerdesek, ertekelesMentese, diakKijelentkezes } from '../szolgaltatások/api';
import '../stilusok/KérdőívOldal.css';

const KérdőívOldal = ({ tanarId, onVissza, onKijelentkezes }) => {
  const [kerdesek, setKerdesek] = useState([]);
  const [valaszlehetosegek, setValaszlehetosegek] = useState([]);
  const [valaszok, setValaszok] = useState({});
  const [betöltés, setBetöltés] = useState(true);
  const [küldés, setKüldés] = useState(false);
  const [hiba, setHiba] = useState('');
  const [siker, setSiker] = useState('');
  const { token, diakInfo } = useContext(HitelelesKontextus);

  useEffect(() => {
    kerdesekLehívása();
  }, [tanarId, token]);

  const kerdesekLehívása = async () => {
    try {
      const response = await getErtekelesKerdesek(token, tanarId);
      console.log('API válasz:', response);
      
      if (response && response.kerdesek) {
        setKerdesek(response.kerdesek);
        setValaszlehetosegek(response.valaszlehetosegek || []);
      }
      setBetöltés(false);
    } catch (err) {
      console.error('Hiba:', err);
      setHiba('Hiba a kérdések betöltésekor');
      setBetöltés(false);
    }
  };

  const handleValaszChange = (kerdesId, pont) => {
    setValaszok({
      ...valaszok,
      [kerdesId]: pont,
    });
  };

  const handleKüldés = async (e) => {
    e.preventDefault();
    setKüldés(true);
    setHiba('');
    setSiker('');

    const formattedValaszok = kerdesek.map((kerdes) => ({
      kerdes_id: kerdes.id,
      pont: valaszok[kerdes.id] !== undefined ? valaszok[kerdes.id] : 0,
    }));

    try {
      const response = await ertekelesMentese(token, tanarId, formattedValaszok);
      console.log('Mentés válasz:', response);
      
      if (response && response.message) {
        setSiker(`${response.message} Átlag: ${response.atlag}`);
        setTimeout(() => {
          onVissza();
        }, 2000);
      }
    } catch (err) {
      console.error('Mentési hiba:', err);
      setHiba('Hiba az értékelés mentésekor');
    } finally {
      setKüldés(false);
    }
  };

  const handleKijelentkezes = async () => {
    try {
      await diakKijelentkezes(token);
      onKijelentkezes();
    } catch (err) {
      console.error('Kijelentkezési hiba:', err);
      onKijelentkezes();
    }
  };

  if (!token) {
    return <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>Nincs bejelentkezve!</div>;
  }

  return (
    <div className="kerdoiv-konténer">
      <div className="kerdoiv-kártya">
        <div className="kerdoiv-fejléc">
          <img src="/assets/logo.png" alt="Logó" className="logó" onError={(e) => e.target.style.display = 'none'} />
          <div className="fejlec-szöveg">
            <h1>Tanár Értékelés</h1>
            <p>Diák: {diakInfo?.nev || 'Ismeretlen'}</p>
          </div>
          <div className="fejlec-gombok">
            <button className="vissza-gomb" onClick={onVissza}>Vissza</button>
            <button className="kijelentkezes-gomb" onClick={handleKijelentkezes}>Kijelentkezés</button>
          </div>
        </div>

        {betöltés ? (
          <p style={{ textAlign: 'center', padding: '20px' }}>Kérdések betöltése...</p>
        ) : hiba ? (
          <p className="hiba">{hiba}</p>
        ) : kerdesek.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '20px', color: '#666' }}>Nincsenek kérdések elérhető.</p>
        ) : (
          <form onSubmit={handleKüldés} className="kerdoiv-forma">
            <div className="kerdesek">
              {kerdesek.map((kerdes, index) => (
                <div key={kerdes.id} className="kerdes-csoport">
                  <h3>{index + 1}. {kerdes.leiras}</h3>
                  <div className="radio-opciok">
                    {valaszlehetosegek && valaszlehetosegek.length > 0 ? (
                      valaszlehetosegek.map((lehetoseg) => (
                        <label key={lehetoseg.pont} className="radio-cimke">
                          <input
                            type="radio"
                            name={`kerdes_${kerdes.id}`}
                            value={lehetoseg.pont}
                            checked={valaszok[kerdes.id] === lehetoseg.pont}
                            onChange={() => handleValaszChange(kerdes.id, lehetoseg.pont)}
                          />
                          <span>{lehetoseg.szoveg}</span>
                        </label>
                      ))
                    ) : (
                      <p>Nincsenek válaszlehetőségek</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {siker && <p className="siker">{siker}</p>}

            <button type="submit" className="kuldes-gomb" disabled={küldés}>
              {küldés ? 'Mentés...' : 'Értékelés Mentése'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default KérdőívOldal;