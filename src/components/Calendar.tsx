// src/components/Calendar.tsx
import React, { useState } from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { Doctor, Patient, Workday, database } from "../data/data.ts";

interface CalendarProps {
  searchQuery: string;
  doctors: Doctor[];
  patients: Patient[];
}

const Calendar: React.FC<CalendarProps> = ({
  searchQuery,
  doctors,
  patients,
}) => {
  const [view, setView] = useState<"daily" | "weekly" | "monthly">("daily");

  const toggleView = () => {
    setView(view === "weekly" ? "monthly" : "weekly");
  };

  const renderView = () => {
    if (searchQuery === "") {
      return <DailyView />;
    } else if (searchQuery.length > 0) {
      return view === "weekly" ? (
        <WeeklyView doctors={doctors} />
      ) : (
        <MonthlyView />
      );
    }
    return <DailyView />;
  };

  return (
    <Box>
      <Text fontSize="2xl" mb={4}>
        Calendar
      </Text>
      {searchQuery.length > 0 && (
        <Button onClick={toggleView} mb={4}>
          Switch to {view === "weekly" ? "Monthly" : "Weekly"} View
        </Button>
      )}
      {renderView()}
    </Box>
  );
};

const DailyView: React.FC = () => (
  <Box>
    <Text>Default View - Daily Overview</Text>
    {/* Implement daily calendar content here */}
  </Box>
);

const WeeklyView: React.FC<{ doctors: Doctor[] }> = ({ doctors }) => {
  return (
    <Box>
      <Text>Weekly View</Text>
      {doctors.map((doctor) => (
        <Box key={doctor.id} mb={4}>
          <Text>{doctor.name}</Text>
          {database.workdays
            .filter((workday) => workday.doctorId === doctor.id)
            .map((workday, index) => (
              <Box key={index}>
                <Text>{workday.day}</Text>
                {workday.timeSlots.map((slot, i) => (
                  <Text key={i}>
                    {slot.start} - {slot.end}
                  </Text>
                ))}
              </Box>
            ))}
        </Box>
      ))}
    </Box>
  );
};

const MonthlyView: React.FC = () => (
  <Box>
    <Text>Monthly View</Text>
    {/* Implement monthly calendar content here */}
  </Box>
);

export default Calendar;
