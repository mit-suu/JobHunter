
// Đường dẫn đến file API của bạn

import UserStatsSummary from "./UserStatsSummary";
import UserTable from "./UserTable";
const AdminDashboard = () => {
  return (
    <div className="p-20 space-y-10">
         <UserStatsSummary />
<UserTable/>
    </div>
  );
};

export default AdminDashboard;
