import { useState } from "react";
import Header from "@/components/Header";
import CalendarView from "@/components/CalendarView";
import DriversView from "@/components/DriversView";
import Footer from "@/components/Footer";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"calendar" | "drivers">("calendar");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-grow">
        {activeTab === "calendar" ? <CalendarView /> : <DriversView />}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
