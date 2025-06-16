import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface Epic {
  id: number;
  name: string;
  epicId: string;
  completion: number;
  testCoverage: number;
  riskScore: number;
  status: string;
}

export default function EpicHealthRadar() {
  const { data: epics, isLoading } = useQuery<Epic[]>({
    queryKey: ["/api/dashboard/epics"],
  });

  if (isLoading) {
    return (
      <Card className="widget-card">
        <CardHeader>
          <CardTitle>Epic Health Radar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center p-4 border rounded">
                <Skeleton className="w-48 h-4" />
                <Skeleton className="w-16 h-4" />
                <Skeleton className="w-16 h-4" />
                <Skeleton className="w-12 h-4" />
                <Skeleton className="w-20 h-6" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      "On Track": "bg-green-100 text-green-800",
      "At Risk": "bg-red-100 text-red-800",
      "Behind": "bg-yellow-100 text-yellow-800",
    };
    return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800";
  };

  const getRiskLevel = (score: number) => {
    if (score < 4) return { level: "Low", color: "text-green-600", bg: "bg-green-100" };
    if (score < 7) return { level: "Medium", color: "text-yellow-600", bg: "bg-yellow-100" };
    return { level: "High", color: "text-red-600", bg: "bg-red-100" };
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 70) return "bg-green-500";
    if (percentage >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className="widget-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Epic Health Radar
          <Select defaultValue="all-epics">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-epics">All Epics</SelectItem>
              <SelectItem value="active-only">Active Only</SelectItem>
              <SelectItem value="at-risk">At Risk</SelectItem>
            </SelectContent>
          </Select>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 text-sm font-medium text-gray-700">Epic</th>
                <th className="text-left py-3 text-sm font-medium text-gray-700">Completion</th>
                <th className="text-left py-3 text-sm font-medium text-gray-700">Test Coverage</th>
                <th className="text-left py-3 text-sm font-medium text-gray-700">Risk Score</th>
                <th className="text-left py-3 text-sm font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {epics?.map((epic) => {
                const riskLevel = getRiskLevel(epic.riskScore);
                return (
                  <tr key={epic.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4">
                      <div>
                        <div className="font-medium text-gray-900">{epic.name}</div>
                        <div className="text-sm text-gray-500">{epic.epicId}</div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`${getProgressColor(epic.completion)} h-2 rounded-full`}
                            style={{ width: `${epic.completion}%` }}
                          />
                        </div>
                        <span className={`text-sm font-medium ${epic.completion >= 70 ? 'text-green-600' : epic.completion >= 40 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {epic.completion}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`${getProgressColor(epic.testCoverage)} h-2 rounded-full`}
                            style={{ width: `${epic.testCoverage}%` }}
                          />
                        </div>
                        <span className={`text-sm font-medium ${epic.testCoverage >= 70 ? 'text-green-600' : epic.testCoverage >= 40 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {epic.testCoverage}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center space-x-2">
                        <div className={`w-8 h-8 ${riskLevel.bg} rounded-full flex items-center justify-center`}>
                          <span className={`text-xs font-bold ${riskLevel.color}`}>{epic.riskScore}</span>
                        </div>
                        <span className={`text-xs ${riskLevel.color}`}>{riskLevel.level}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <Badge className={`${getStatusBadge(epic.status)} border-0`}>
                        {epic.status}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
