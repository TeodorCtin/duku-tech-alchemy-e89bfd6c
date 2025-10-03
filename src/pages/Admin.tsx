import AdminDashboard from "@/admin/components/AdminDashboard";
import SEO from "@/components/SEO";

const AdminPage = () => {
  return (
    <>
      <SEO 
        title="Admin Dashboard - Duku Constantin" 
        description="Content management system for portfolio website"
        noIndex={true}
      />
      <AdminDashboard />
    </>
  );
};

export default AdminPage;