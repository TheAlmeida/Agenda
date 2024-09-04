// src/data/data.ts
export interface Doctor {
  id: number;
  name: string;
  phone: string;
}

export interface Patient {
  id: number;
  name: string;
  phone: string;
  email: string;
}

export interface Workday {
  doctorId: number;
  day: string; // "Monday", "Tuesday", etc.
  timeSlots: Array<{ start: string; end: string }>;
}

// Initial data structure
export interface Database {
  doctors: Doctor[];
  patients: Patient[];
  workdays: Workday[];
}

export const database: Database = {
  doctors: [],
  patients: [],
  workdays: [],
};

// Utility functions (optional)
export const addDoctor = (doctor: Doctor) => {
  database.doctors.push(doctor);
};

export const addPatient = (patient: Patient) => {
  database.patients.push(patient);
};

export const addWorkday = (workday: Workday) => {
  database.workdays.push(workday);
};

export const saveDatabase = () => {
  localStorage.setItem("database", JSON.stringify(database));
};

export const loadDatabase = () => {
  const savedData = localStorage.getItem("database");
  if (savedData) {
    Object.assign(database, JSON.parse(savedData));
  }
};

// Call `loadDatabase()` when the app starts to load saved data.
loadDatabase();
