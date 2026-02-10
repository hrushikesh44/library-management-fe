import { IconAlertTriangle, IconBook, IconRepeat, IconUser } from "@tabler/icons-react";

const stats = [
  { title: "Total Books", value: 1248, icon: IconBook },
  { title: "Active Members", value: 342, icon: IconUser },
  { title: "Books Issued", value: 186, icon: IconRepeat },
  { title: "Overdue Books", value: 23, icon: IconAlertTriangle },
];

const recentIssues = [
  {
    id: 1,
    book: "Clean Code",
    member: "Amit Sharma",
    issuedOn: "2026-02-01",
    dueOn: "2026-02-10",
    status: "Issued",
  },
  {
    id: 2,
    book: "Design Patterns",
    member: "Neha Verma",
    issuedOn: "2026-01-28",
    dueOn: "2026-02-05",
    status: "Overdue",
  },
  {
    id: 3,
    book: "You Don’t Know JS",
    member: "Rahul Iyer",
    issuedOn: "2026-02-03",
    dueOn: "2026-02-12",
    status: "Issued",
  },
];

export default function LibraryDashboard() {
  return (
    <div className="p-10 space-y-6 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Library Dashboard</h1>
        <p className="text-sm text-gray-500">Overview of library activity (mock data)</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-2xl shadow-sm p-4 flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <stat.icon className="w-6 h-6 text-gray-400" />
          </div>
        ))}
      </div>

      {/* Recent Issues */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Book Issues</h2>
          <button className="text-sm px-3 py-1 border rounded-lg hover:bg-gray-100">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr className="text-left text-gray-500">
                <th className="py-2">Book</th>
                <th>Member</th>
                <th>Issued On</th>
                <th>Due On</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentIssues.map((issue) => (
                <tr key={issue.id} className="border-b last:border-0">
                  <td className="py-2">{issue.book}</td>
                  <td>{issue.member}</td>
                  <td>{issue.issuedOn}</td>
                  <td>{issue.dueOn}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        issue.status === "Overdue"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {issue.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
