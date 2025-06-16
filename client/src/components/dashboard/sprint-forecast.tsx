import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface SprintMetrics {
  id: number;
  sprintNumber: number;
  successProbability: number;
  plannedPoints: number;
  estimatedCompletion: number;
  velocity: number;
}

export default function SprintForecast() {
  const { data: sprintMetrics, isLoading } = useQuery<SprintMetrics[]>({
    queryKey: ["/api/dashboard/sprint-metrics"],
  });

  if (isLoading) {
    return (
      <Card className="widget-card">
        <CardHeader>
          <CardTitle>Sprint Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-8 mb-4" />
          <div className="space-y-3">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const sprint = sprintMetrics?.[0];
  if (!sprint) return null;

  return (
    <Card className="widget-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Sprint Forecast
          <div className="flex items-center space-x-1">
            <BarChart3 className="w-4 h-4 text-quorum-blue" />
            <span className="text-xs text-gray-500">Predictive</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Sprint {sprint.sprintNumber} Success Probability</span>
            <span className="text-2xl font-bold text-green-600">{sprint.successProbability}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full" 
              style={{ width: `${sprint.successProbability}%` }}
            />
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Planned Points</span>
            <span className="text-sm font-medium">{sprint.plannedPoints}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Estimated Completion</span>
            <span className="text-sm font-medium text-green-600">{sprint.estimatedCompletion}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Historical Velocity</span>
            <span className="text-sm font-medium">{sprint.velocity} avg</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-medium text-gray-700 mb-1">Key Factors</div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-xs text-gray-600">Team velocity trending up</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full" />
            <span className="text-xs text-gray-600">3 dependencies identified</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-xs text-gray-600">Low complexity stories</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
