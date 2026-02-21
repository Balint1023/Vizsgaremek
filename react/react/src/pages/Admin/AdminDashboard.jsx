import LogoutButton from "../../components/LogoutButton";

const AdminDashboard = () => {
    return (
        <div className="admin-container">
            <h1>Admin Vezérlőpult</h1>
            <p>Itt tudod kezelni a diákokat, tanárokat és kérdőíveket.</p>
            <LogoutButton />
        </div>
    );
};

export default AdminDashboard;