// src/components/Layout.tsx
import React, { useState } from "react";
import { Box, Flex, Input, Button } from "@chakra-ui/react";
import Calendar from "./Calendar";
import RegistrationForm from "./RegistrationForm";
import AddWorkdayForm from "./AddWorkdayForm";
import { database } from "../data/data.ts";

const Layout: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isRegisterOpen, setRegisterOpen] = useState<boolean>(false);
  const [isAddWorkdayOpen, setAddWorkdayOpen] = useState<boolean>(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredDoctors = database.doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.phone.includes(searchQuery)
  );

  const filteredPatients = database.patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery)
  );

  return (
    <Flex height="100vh">
      {/* Sidebar */}
      <Box width="20%" p={4} bg="gray.100" boxShadow="md">
        <Input
          placeholder="Search by name or phone..."
          mb={4}
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Box mt={4}>
          <Button width="100%" mb={2} onClick={() => setRegisterOpen(true)}>
            Register
          </Button>
          <Button width="100%" onClick={() => setAddWorkdayOpen(true)}>
            Add Workday for Doctor
          </Button>
        </Box>
      </Box>

      {/* Main Content - Calendar */}
      <Box flex="1" p={4} bg="white">
        <Calendar
          searchQuery={searchQuery}
          doctors={filteredDoctors}
          patients={filteredPatients}
        />
      </Box>

      {/* Modals */}
      <RegistrationForm
        isOpen={isRegisterOpen}
        onClose={() => setRegisterOpen(false)}
      />
      <AddWorkdayForm
        isOpen={isAddWorkdayOpen}
        onClose={() => setAddWorkdayOpen(false)}
      />
    </Flex>
  );
};

export default Layout;
