// src/components/AddWorkdayForm.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
} from "@chakra-ui/react";
import { database, Workday } from "../data/data.ts";

interface AddWorkdayFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddWorkdayForm: React.FC<AddWorkdayFormProps> = ({ isOpen, onClose }) => {
  const [doctorId, setDoctorId] = useState<number>(
    database.doctors[0]?.id || 0
  );
  const [day, setDay] = useState<string>("Monday");
  const [start, setStart] = useState<string>("09:00");
  const [end, setEnd] = useState<string>("17:00");

  const handleSubmit = () => {
    const newWorkday: Workday = {
      doctorId,
      day,
      timeSlots: [{ start, end }],
    };
    database.workdays.push(newWorkday);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Workday for Doctor</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Doctor</FormLabel>
            <Select
              value={doctorId}
              onChange={(e) => setDoctorId(Number(e.target.value))}
            >
              {database.doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Day</FormLabel>
            <Select value={day} onChange={(e) => setDay(e.target.value)}>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </Select>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Start Time</FormLabel>
            <Input
              type="time"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>End Time</FormLabel>
            <Input
              type="time"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddWorkdayForm;
