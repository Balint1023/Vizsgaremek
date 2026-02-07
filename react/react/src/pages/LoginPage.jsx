import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/Login/LoginForm';

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLoginSuccess = () => {
        console.log("Átirányítás indítása...");
        const user = JSON.parse(localStorage.getItem('user'));

        navigate(`/diak/${user.id}/hianyzo-ertekelesek`);
    };

    return (
        <div>
            <LoginForm onLoginSuccess={handleLoginSuccess} />
        </div>
    );
};

export default LoginPage;