// src/App.tsx
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "./components/Layout";

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Layout />
    </ChakraProvider>
  );
};

export default App;
