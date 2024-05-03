import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthCont from "./Context/AuthContext.jsx";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="max-w-screen-lg mx-auto">
      <QueryClientProvider client={queryClient}>
       <AuthCont><RouterProvider router={router} /></AuthCont>
      </QueryClientProvider>
    </div>
  </React.StrictMode>
);
