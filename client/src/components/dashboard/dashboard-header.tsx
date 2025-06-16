import { User } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="bg-quorum-dark text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-quorum-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">Q</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold">BA Intelligence Dashboard</h1>
              <p className="text-blue-200 text-sm">Business Analysis Hub</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium">Sarah Johnson</p>
              <p className="text-blue-200 text-xs">Business Analyst</p>
            </div>
            <div className="w-8 h-8 bg-quorum-blue rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
