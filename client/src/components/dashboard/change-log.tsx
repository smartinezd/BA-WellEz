import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";

interface ChangeLog {
  id: number;
  title: string;
  description: string;
  author: string;
  type: string;
  impact?: string;
  createdAt: string;
}

export default function ChangeLog() {
  const { data: changeLogs, isLoading } = useQuery<ChangeLog[]>({
    queryKey: ["/api/dashboard/change-logs"],
  });

  if (isLoading) {
    return (
      <Card className="widget-card">
        <CardHeader>
          <CardTitle>Change Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <Skeleton className="w-8 h-8 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-3/4 h-3" />
                  <Skeleton className="w-1/2 h-3" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const getChangeIcon = (type: string) => {
    switch (type) {
      case "Story Creation":
        return <Plus className="w-4 h-4 text-white" />;
      case "Sprint Planning":
        return <Edit className="w-4 h-4 text-white" />;
      case "Ownership Transfer":
        return <Users className="w-4 h-4 text-white" />;
      default:
        return <Plus className="w-4 h-4 text-white" />;
    }
  };

  const getChangeColor = (type: string) => {
    switch (type) {
      case "Story Creation":
        return "bg-quorum-blue";
      case "Sprint Planning":
        return "bg-yellow-500";
      case "Ownership Transfer":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="widget-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Change Log
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-quorum-blue hover:text-blue-700">
              View All
            </Button>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-gray-500">Live</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {changeLogs?.map((change) => (
            <div key={change.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex-shrink-0">
                <div className={`w-8 h-8 ${getChangeColor(change.type)} rounded-full flex items-center justify-center`}>
                  {getChangeIcon(change.type)}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">{change.title}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">by {change.author}</span>
                    <span className="text-xs text-gray-400">
                      {formatDistanceToNow(new Date(change.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">{change.description}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-xs text-gray-500">Type: {change.type}</span>
                  {change.impact && (
                    <span className="text-xs text-gray-500">Impact: {change.impact}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
