import AdminSurveyControl from "./AdminSurveyControl";
import "./AdminSurveyControlPage.css";

const AdminSurveyControlPage = () => {
    return (
        <div className="admin-page-content">
            <h2>Kérdőívek kezelése</h2>
            <p>Itt tudod elindítani vagy lezárni a kitöltési időszakot.</p>
            <AdminSurveyControl />
        </div>
    );
};

export default AdminSurveyControlPage;