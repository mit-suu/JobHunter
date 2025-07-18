import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../../services/userService";
import { useNavigate } from "react-router-dom";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    const data = await getUsers();
    setUsers(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa user này?")) {
      const success = await deleteUser(id);
      if (success) {
        setUsers((prev) => prev.filter((u) => u.id !== id));
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/users/${id}`); // <-- chuyển đến trang chỉnh sửa user
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <div className="p-4">Đang tải dữ liệu...</div>;

  return (
    <div className="">
      <h2 className="font-poppins text-3xl font-bold text-gray-800 dark:text-white sm:text-4xl">
        User <span className="text-[#26A4FF]">Management</span>
      </h2>
      <div className="space-y-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between bg-white p-4 rounded shadow hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <img
                src={user.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlRM2-AldpZgaraCXCnO5loktGi0wGiNPydQ&s"}
                alt={user.username}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="font-semibold">{user.username}</div>
                <div className="text-gray-500 text-sm">{user.email}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleDelete(user.id)}
                className="text-red-600 hover:text-red-800"
                title="Xóa"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleUpdate(user.id)}
                className="text-blue-600 hover:text-blue-800"
                title="Cập nhật"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserTable;
