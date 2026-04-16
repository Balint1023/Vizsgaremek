import AdminSurveyControl from "./AdminSurveyControl";
import "./AdminSurveyControlPage.css";

const AdminSurveyControlPage = () => {
    return (
        <div className="admin-page-content">
            <h2>Kérdőívek kezelése</h2>
            <AdminSurveyControl />
        </div>
    );
};

export default AdminSurveyControlPage;