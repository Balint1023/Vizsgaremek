import { useNavigate } from 'react-router-dom';
import AdminLoginForm from '../../components/login/AdminLoginForm';

const AdminLoginPage = () => {
    const navigate = useNavigate();

    const handleSuccess = () => {
        navigate('/admin/dashboard');
    };

    return (
        <div>
            <AdminLoginForm onLoginSuccess={handleSuccess} />
        </div>
    );
};

export default AdminLoginPage;