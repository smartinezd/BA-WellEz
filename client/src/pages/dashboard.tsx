import DashboardHeader from "@/components/dashboard/dashboard-header";
import DashboardFilters from "@/components/dashboard/dashboard-filters";
import DeliveryRiskScore from "@/components/dashboard/delivery-risk-score";
import SprintForecast from "@/components/dashboard/sprint-forecast";
import OkrAlignment from "@/components/dashboard/okr-alignment";
import EpicHealthRadar from "@/components/dashboard/epic-health-radar";
import AiSummaryFeed from "@/components/dashboard/ai-summary-feed";
import TraceabilityMap from "@/components/dashboard/traceability-map";
import ChangeLog from "@/components/dashboard/change-log";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <DashboardFilters />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Priority Widgets Row */}
          <div className="lg:col-span-4">
            <DeliveryRiskScore />
          </div>
          <div className="lg:col-span-4">
            <SprintForecast />
          </div>
          <div className="lg:col-span-4">
            <OkrAlignment />
          </div>
          
          {/* Second Row */}
          <div className="lg:col-span-8">
            <EpicHealthRadar />
          </div>
          <div className="lg:col-span-4">
            <AiSummaryFeed />
          </div>
          
          {/* Third Row */}
          <div className="lg:col-span-8">
            <TraceabilityMap />
          </div>
          
          {/* Full Width Row */}
          <div className="lg:col-span-12">
            <ChangeLog />
          </div>
        </div>
      </div>
    </div>
  );
}
