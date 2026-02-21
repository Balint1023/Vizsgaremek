import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/login/LoginForm';

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLoginSuccess = () => {
        navigate('/hianyzo-ertekelesek');
    };

    return (
        <div>
            <LoginForm onLoginSuccess={handleLoginSuccess} />
        </div>
    );
};

export default LoginPage;