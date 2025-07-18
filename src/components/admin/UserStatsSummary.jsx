import React, { useEffect, useState } from "react";
import { getUsers } from "../../services/userService";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#7F00FF"];

const UserStatsSummary = () => {
  const [users, setUsers] = useState([]);
  const [topSkills, setTopSkills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUsers();
      setUsers(data);

      // Thống kê top skills
      const skillCount = {};
      data.forEach((user) => {
        user.skills?.forEach((skill) => {
          skillCount[skill] = (skillCount[skill] || 0) + 1;
        });
      });

      const sortedSkills = Object.entries(skillCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([skill, count]) => ({ name: skill, value: count }));

      setTopSkills(sortedSkills);
    };

    fetchData();
  }, []);

  const total = users.length;
  const totalAdmins = users.filter((u) => u.role === "Admin").length;
  const totalUsers = total - totalAdmins;
  const premiumUsers = users.filter((u) => u.isPremium).length;

  return (
    <div className="grid gap-6">
      <h2 className="font-poppins text-3xl font-bold text-gray-800 dark:text-white sm:text-4xl">
        User <span className="text-[#26A4FF]">statistics</span>
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded bg-white p-4 text-center shadow">
          <p className="text-gray-500">Total number of users</p>
          <p className="text-2xl font-semibold">{total}</p>
        </div>
        <div className="rounded bg-white p-4 text-center shadow">
          <p className="text-gray-500">Admins</p>
          <p className="text-2xl font-semibold">{totalAdmins}</p>
        </div>
        <div className="rounded bg-white p-4 text-center shadow">
          <p className="text-gray-500">Users</p>
          <p className="text-2xl font-semibold">{totalUsers}</p>
        </div>
        <div className="rounded bg-white p-4 text-center shadow">
          <p className="text-gray-500">Premium</p>
          <p className="text-2xl font-semibold">{premiumUsers}</p>
        </div>
      </div>

      {/* Pie Chart cho Top Skills */}
<h2 className="font-poppins text-3xl font-bold text-gray-800 dark:text-white sm:text-4xl">
  Top 5<span className="text-[#26A4FF]"> common skills</span>
</h2>
<div className="rounded bg-white py-6 px-2 shadow">
  {topSkills.length > 0 ? (
    <ResponsiveContainer width="100%" height={350}>
  <BarChart
    layout="vertical"
    data={topSkills}
    margin={{ top: 20, right: 20, left: 60, bottom: 20 }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis type="number" />
    <YAxis
      type="category"
      dataKey="name"
      width={140}
      tick={{ fontSize: 14, fill: "#333" }}
    />
    <Tooltip />
    <Legend />
    <Bar
      dataKey="value"
      fill="#26A4FF"
      radius={[0, 10, 10, 0]}
      barSize={25}
    />
  </BarChart>
</ResponsiveContainer>

  ) : (
    <p className="text-gray-500">Không có dữ liệu kỹ năng.</p>
  )}
</div>
    </div>
  );
};

export default UserStatsSummary;
