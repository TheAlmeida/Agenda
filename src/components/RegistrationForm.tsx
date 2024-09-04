// src/components/RegistrationForm.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  RadioGroup,
  Radio,
  Stack,
} from "@chakra-ui/react";
import {
  database,
  Doctor,
  Patient,
  addDoctor,
  addPatient,
} from "../data/data.ts";
import { saveDatabase } from "../data/data.ts";

// Inside handleSubmit function
saveDatabase();

interface RegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  isOpen,
  onClose,
}) => {
  const [type, setType] = useState<"doctor" | "patient">("doctor");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (type === "doctor") {
      const newDoctor: Doctor = {
        id: database.doctors.length + 1, // generate a new ID
        name,
        phone,
      };
      addDoctor(newDoctor);
    } else {
      const newPatient: Patient = {
        id: database.patients.length + 1, // generate a new ID
        name,
        phone,
        email,
      };
      addPatient(newPatient);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Register {type === "doctor" ? "Doctor" : "Patient"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <RadioGroup
            onChange={(value) => setType(value as "doctor" | "patient")}
            value={type}
          >
            <Stack direction="row">
              <Radio value="doctor">Doctor</Radio>
              <Radio value="patient">Patient</Radio>
            </Stack>
          </RadioGroup>
          <FormControl mt={4}>
            <FormLabel>Name</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Phone</FormLabel>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </FormControl>
          {type === "patient" && (
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
          )}
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

export default RegistrationForm;
