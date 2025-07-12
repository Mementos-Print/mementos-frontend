import AvailableEvents from "../components/dashboard/AvailableEvents";
import Header from "../components/dashboard/Header";
import Library from "../components/dashboard/Library";
import { DashboardHeader } from "../components/ui/Dashboard";

const Dashboard = () => {
  return (
    <DashboardHeader className="bg-[#F5F5F5]">
      <Header />
      <AvailableEvents />
      <Library />
    </DashboardHeader>
  );
};

export default Dashboard;
