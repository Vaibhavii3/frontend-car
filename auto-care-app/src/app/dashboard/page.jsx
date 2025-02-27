export default function Dashboard() {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
  
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-5 bg-blue-500 text-white rounded shadow">
            <h3 className="text-lg">Total users</h3>
            <p className="text-2xl">1,245</p>
          </div>
          <div className="p-5 bg-green-500 text-white rounded shadow">
            <h3 className="text-lg">Active orders</h3>
            <p className="text-2xl">78</p>
          </div>
          <div className="p-5 bg-yellow-500 text-white rounded shadow">
            <h3 className="text-lg">Revenue</h3>
            <p className="text-2xl">$52,800</p>
          </div>
        </div>
      </div>
    );
  }
  