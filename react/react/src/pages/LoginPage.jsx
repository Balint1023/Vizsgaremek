import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/Login/LoginForm';

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLoginSuccess = () => {
        // Egyszerűen átirányítunk a fix útvonalra
        // A szerver a Token alapján tudni fogja, ki kérdezi le az adatokat
        navigate('/hianyzo-ertekelesek');
    };

    return (
        <div>
            <LoginForm onLoginSuccess={handleLoginSuccess} />
        </div>
    );
};

export default LoginPage;