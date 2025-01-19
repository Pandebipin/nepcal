import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface Event {
  id: number;
  date: Date;
  title: string;
  description: string;
}

// Nepali month names
const nepaliMonths = [
  "Baisakh",
  "Jestha",
  "Ashadh",
  "Shrawan",
  "Bhadra",
  "Ashwin",
  "Kartik",
  "Mangsir",
  "Poush",
  "Magh",
  "Falgun",
  "Chaitra",
];

// Days in each Nepali month (approximate)
const daysInNepaliMonth = [31, 31, 32, 32, 31, 31, 30, 29, 30, 29, 30, 30];

function App() {
  const [currentNepaliMonth, setCurrentNepaliMonth] = useState(0); // 0-11
  const [currentNepaliYear, setCurrentNepaliYear] = useState(2080); // Current Nepali year
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Create a mock event for the 15th day
    const mockEvent: Event = {
      id: 1,
      date: new Date(), // Using Gregorian date internally
      title: "Team Meeting",
      description: "Discuss project progress and upcoming deadlines",
    };
    setEvents([mockEvent]);
  }, [currentNepaliMonth]);

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentNepaliMonth((prevMonth) => {
      if (direction === "prev") {
        if (prevMonth === 0) {
          setCurrentNepaliYear((prev) => prev - 1);
          return 11;
        }
        return prevMonth - 1;
      } else {
        if (prevMonth === 11) {
          setCurrentNepaliYear((prev) => prev + 1);
          return 0;
        }
        return prevMonth + 1;
      }
    });
  };

  const renderCalendarDays = () => {
    const days = [];
    // Assuming first day of month starts on Sunday for simplicity
    // In a production app, you'd want to calculate the actual first day
    const daysInMonth = daysInNepaliMonth[currentNepaliMonth];

    for (let day = 1; day <= daysInMonth; day++) {
      const hasEvents = day === 15; // Mock event on 15th day
      const dayStyle = `
        border p-2 h-24 relative cursor-pointer
        hover:bg-gray-50 transition-colors
        ${hasEvents ? "bg-blue-50" : ""}
      `;

      days.push(
        <div
          key={day}
          className={dayStyle}
          onClick={() => {
            if (hasEvents) {
              setSelectedEvent(events[0]);
            } else {
              setSelectedEvent(null);
            }
          }}
        >
          <span className="absolute top-1 left-1">{day}</span>
          {hasEvents && (
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">1</span>
            </div>
          )}
        </div>,
      );
    }
    return days;
  };

  return (
    <div className="flex">
      <Card className="flex-grow mr-4">
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateMonth("prev")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-bold">
              {nepaliMonths[currentNepaliMonth]} {currentNepaliYear}
            </h2>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateMonth("next")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center font-bold">
                {day}
              </div>
            ))}
            {renderCalendarDays()}
          </div>
        </CardContent>
      </Card>
      <Card className="w-64">
        <CardContent>
          <h3 className="text-lg font-bold mb-2">Event Details</h3>
          <ScrollArea className="h-[calc(100vh-200px)]">
            {selectedEvent ? (
              <div>
                <h4 className="font-semibold">{selectedEvent.title}</h4>
                <p className="text-sm text-gray-600">
                  {nepaliMonths[currentNepaliMonth]} {15}, {currentNepaliYear}
                </p>
                <p className="mt-2">{selectedEvent.description}</p>
              </div>
            ) : (
              <p className="text-gray-500">Select an event to view details</p>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
