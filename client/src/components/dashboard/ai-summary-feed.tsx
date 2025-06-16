import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";

interface Summary {
  id: number;
  storyId: string;
  description: string;
  severity: string;
  nextStep: string;
  createdAt: string;
}

export default function AiSummaryFeed() {
  const { data: summaries, isLoading } = useQuery<Summary[]>({
    queryKey: ["/api/dashboard/summaries"],
  });

  if (isLoading) {
    return (
      <Card className="widget-card">
        <CardHeader>
          <CardTitle>AI Summary Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border-l-4 border-gray-300 p-3 rounded-r-lg">
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-full h-3 mb-2" />
                <Skeleton className="w-20 h-3" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const getSeverityColors = (severity: string) => {
    const colors = {
      Critical: { border: "border-red-500", bg: "bg-red-50", text: "text-red-900", badge: "text-red-600" },
      Attention: { border: "border-yellow-500", bg: "bg-yellow-50", text: "text-yellow-900", badge: "text-yellow-600" },
      Info: { border: "border-blue-500", bg: "bg-blue-50", text: "text-blue-900", badge: "text-blue-600" },
      Success: { border: "border-green-500", bg: "bg-green-50", text: "text-green-900", badge: "text-green-600" },
    };
    return colors[severity as keyof typeof colors] || colors.Info;
  };

  return (
    <Card className="widget-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          AI Summary Feed
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-purple-500" fill="currentColor" />
            <span className="text-xs text-gray-500">NLP</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {summaries?.map((summary) => {
            const colors = getSeverityColors(summary.severity);
            return (
              <div key={summary.id} className={`border-l-4 ${colors.border} ${colors.bg} p-3 rounded-r-lg`}>
                <div className="flex items-start justify-between mb-2">
                  <h4 className={`text-sm font-medium ${colors.text}`}>Story {summary.storyId}</h4>
                  <span className={`text-xs ${colors.badge}`}>{summary.severity}</span>
                </div>
                <p className={`text-sm ${colors.text} mb-2`}>{summary.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${colors.badge}`}>Next: {summary.nextStep}</span>
                  <span className={`text-xs ${colors.badge.replace('600', '500')}`}>
                    {formatDistanceToNow(new Date(summary.createdAt), { addSuffix: true })}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
