import Loading from "@/components/dashboard/view-projects/loading";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useDashboardStats } from "@/api/querys/useCreateProject";
import NavigationButton from "@/components/ui-custom/navigation-button";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const DashboardStatsComponent = () => {
  const { data: stats, isLoading, isError, error } = useDashboardStats();

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <p className="text-red-500 text-center mt-10">
        {error?.message || "Failed to load dashboard stats"}
      </p>
    );

  if (!stats) return null;

  const totalsData = [
    { name: "Users", value: stats.totalUsers || 0 },
    { name: "Projects", value: stats.totalProjects || 0 },
    { name: "Visitors", value: stats.totalVisitors || 0 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Dashboard Stats
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {totalsData.map((item) => (
            <div
              key={item.name}
              className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                {item.name}
              </h2>
              <p className="text-3xl font-bold text-gray-900">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
              Totals Overview
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={totalsData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
              Proportions
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={totalsData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {totalsData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {stats.users && stats.users.length > 0 && (
          <div className="bg-white shadow-md rounded-lg p-6 overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">
              Users
            </h2>
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  {["ID", "First Name", "Last Name", "Email", "Role"].map(
                    (heading) => (
                      <th
                        key={heading}
                        className="border-b p-3 text-left text-gray-700 uppercase text-sm"
                      >
                        {heading}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {stats.users.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition-colors`}
                  >
                    <td className="border-b p-3">{user.id}</td>
                    <td className="border-b p-3">{user.firstName}</td>
                    <td className="border-b p-3">{user.lastName}</td>
                    <td
                      className="border-b p-3 truncate max-w-xs"
                      title={user.email}
                    >
                      {user.email}
                    </td>
                    <td className="border-b p-3">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-center">
          <NavigationButton
            buttonText="Go back to dashboard"
            buttonRoute="/dashboard"
            icon=""
            className="bg-violet-400 hover:bg-violet-500 text-white font-semibold py-3 px-6 rounded-md shadow-md hover:shadow-lg transition"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardStatsComponent;
