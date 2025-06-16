import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Code, CheckCircle, Cloud, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Traceability {
  id: number;
  storyId: string;
  commits: number;
  tests: number;
  deployment: string;
  unitTests: string;
  integrationTests: string;
  e2eTests: string;
  stagingStatus: string;
  productionStatus: string;
}

export default function TraceabilityMap() {
  const { data: traceability, isLoading } = useQuery<Traceability[]>({
    queryKey: ["/api/dashboard/traceability"],
  });

  if (isLoading) {
    return (
      <Card className="widget-card">
        <CardHeader>
          <CardTitle>Traceability Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center">
                  <Skeleton className="w-16 h-16 rounded-full" />
                  {i < 5 && <ChevronRight className="mx-4 w-8 h-8 text-gray-300" />}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="w-full h-20" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const trace = traceability?.[0];
  if (!trace) return null;

  return (
    <Card className="widget-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Traceability Map
          <Select defaultValue={trace.storyId}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="US-2847">Story US-2847</SelectItem>
              <SelectItem value="US-2901">Story US-2901</SelectItem>
              <SelectItem value="US-2789">Story US-2789</SelectItem>
            </SelectContent>
          </Select>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Traceability Flow */}
          <div className="flex items-center justify-between mb-6">
            {/* Story */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-quorum-blue rounded-full flex items-center justify-center mb-2">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-gray-900">{trace.storyId}</div>
                <div className="text-xs text-gray-500">Story</div>
              </div>
            </div>

            <ChevronRight className="flex-1 mx-4 w-8 h-8 text-gray-400" />

            {/* Commits */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-2">
                <Code className="w-8 h-8 text-white" />
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-gray-900">{trace.commits} Commits</div>
                <div className="text-xs text-gray-500">Development</div>
              </div>
            </div>

            <ChevronRight className="flex-1 mx-4 w-8 h-8 text-gray-400" />

            {/* Test Cases */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-2">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-gray-900">{trace.tests} Tests</div>
                <div className="text-xs text-gray-500">Validation</div>
              </div>
            </div>

            <ChevronRight className="flex-1 mx-4 w-8 h-8 text-gray-400" />

            {/* Deployment */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-2">
                <Cloud className="w-8 h-8 text-white" />
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-gray-900">{trace.deployment}</div>
                <div className="text-xs text-gray-500">Production</div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="text-xs font-medium text-gray-700 mb-2">Recent Commits</h4>
              <div className="space-y-1">
                <div className="text-xs text-gray-600">fix: payment validation logic</div>
                <div className="text-xs text-gray-600">feat: add error handling</div>
                <div className="text-xs text-gray-600">test: unit tests for API calls</div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="text-xs font-medium text-gray-700 mb-2">Test Results</h4>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-600">Unit Tests</span>
                  <span className="text-xs text-green-600">{trace.unitTests}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-600">Integration</span>
                  <span className="text-xs text-green-600">{trace.integrationTests}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-600">E2E Tests</span>
                  <span className="text-xs text-yellow-600">{trace.e2eTests}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="text-xs font-medium text-gray-700 mb-2">Dependencies</h4>
              <div className="space-y-1">
                <div className="text-xs text-gray-600">US-2801 (Completed)</div>
                <div className="text-xs text-gray-600">US-2789 (In Progress)</div>
                <div className="text-xs text-red-600">US-2912 (Blocked)</div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="text-xs font-medium text-gray-700 mb-2">Deployment Status</h4>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-xs text-gray-600">Staging</span>
                  <span className="text-xs text-green-600">{trace.stagingStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-600">Production</span>
                  <span className="text-xs text-yellow-600">{trace.productionStatus}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
