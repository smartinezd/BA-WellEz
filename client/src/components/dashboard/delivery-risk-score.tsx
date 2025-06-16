import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface RiskMetrics {
  id: number;
  riskScore: number;
  blockersCount: number;
  delaysCount: number;
  missingDataCount: number;
  recommendation: string;
}

export default function DeliveryRiskScore() {
  const { data: riskMetrics, isLoading } = useQuery<RiskMetrics[]>({
    queryKey: ["/api/dashboard/risk-metrics"],
  });

  if (isLoading) {
    return (
      <Card className="widget-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Delivery Risk Score
            <Skeleton className="w-20 h-4" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="w-32 h-32 rounded-full mx-auto mb-4" />
          <div className="space-y-3">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const risk = riskMetrics?.[0];
  if (!risk) return null;

  const circumference = 2 * Math.PI * 56;
  const strokeDashoffset = circumference - (risk.riskScore / 10) * circumference;

  return (
    <Card className="widget-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Delivery Risk Score
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
            <span className="text-xs text-gray-500">AI Generated</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <svg className="w-32 h-32 progress-ring">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#e5e7eb"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="#fbbf24"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="progress-ring-circle"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600">{risk.riskScore}</div>
                <div className="text-sm text-gray-500">Risk Score</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Blockers</span>
            <span className="text-sm font-medium text-red-600">{risk.blockersCount} Active</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Delayed Stories</span>
            <span className="text-sm font-medium text-yellow-600">{risk.delaysCount} Items</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Missing Data</span>
            <span className="text-sm font-medium text-orange-600">{risk.missingDataCount} Gaps</span>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Recommendation:</strong> {risk.recommendation}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
