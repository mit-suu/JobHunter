import AdminDashboard from "../../components/admin/AdminDashboard";
import { motion } from "framer-motion";
function AdminPage() {
  return (
  <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
    >
    <div className="font-poppins ">
    <AdminDashboard/>
  </div>  </motion.div>)
}

export default AdminPage;
