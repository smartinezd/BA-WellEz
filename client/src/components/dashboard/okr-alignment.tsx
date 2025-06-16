import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface Okr {
  id: number;
  title: string;
  description: string;
  progress: number;
  quarter: string;
  storiesAligned: number;
}

export default function OkrAlignment() {
  const { data: okrs, isLoading } = useQuery<Okr[]>({
    queryKey: ["/api/dashboard/okrs"],
  });

  if (isLoading) {
    return (
      <Card className="widget-card">
        <CardHeader>
          <CardTitle>OKR Alignment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-2" />
                <Skeleton className="w-20 h-3" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-quorum-blue";
    return "bg-yellow-500";
  };

  const getBorderColor = (progress: number) => {
    if (progress >= 80) return "border-green-500";
    if (progress >= 60) return "border-quorum-blue";
    return "border-yellow-500";
  };

  const getTextColor = (progress: number) => {
    if (progress >= 80) return "text-green-600";
    if (progress >= 60) return "text-quorum-blue";
    return "text-yellow-600";
  };

  return (
    <Card className="widget-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          OKR Alignment
          <Badge variant="secondary" className="bg-quorum-blue text-white">Q1 2024</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {okrs?.map((okr) => (
            <div key={okr.id} className={`border-l-4 ${getBorderColor(okr.progress)} pl-4`}>
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{okr.title}</h4>
                  <p className="text-xs text-gray-500">{okr.description}</p>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${getTextColor(okr.progress)}`}>{okr.progress}%</div>
                  <div className="text-xs text-gray-500">Progress</div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                <div 
                  className={`${getProgressColor(okr.progress)} h-1.5 rounded-full`} 
                  style={{ width: `${okr.progress}%` }}
                />
              </div>
              <div className="text-xs text-gray-600">{okr.storiesAligned} stories aligned</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
