import { useState } from "react";
import Header, { type Tab } from "@/components/Header";
import CalendarView from "@/components/CalendarView";
import DriversView from "@/components/DriversView";
import StandingsView from "@/components/StandingsView";
import Footer from "@/components/Footer";

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>("calendar");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-grow">
        {activeTab === "calendar" && <CalendarView />}
        {activeTab === "drivers" && <DriversView />}
        {activeTab === "standings" && <StandingsView />}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
