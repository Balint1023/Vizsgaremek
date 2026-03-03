import AdminSurveyControl from "./AdminSurveyControl";

const AdminSurveyControlPage = () => {
    return (
        <div className="admin-page-content">
            <h2>Kérdőívek kezelése</h2>
            <p>Itt tudod elindítani vagy lezárni a kitöltési időszakot.</p>
            <hr />
            <AdminSurveyControl />
        </div>
    );
};

export default AdminSurveyControlPage;