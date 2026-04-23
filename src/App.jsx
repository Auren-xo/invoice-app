import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import InvoiceList from "./pages/InvoiceList";
import InvoiceDetail from "./pages/InvoiceDetail";
import InvoiceForm from "./pages/InvoiceForm";

export default function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div
      className={
        theme === "dark"
          ? "min-h-screen bg-black text-white p-6"
          : "min-h-screen bg-[#f8f8fb] text-black p-6"
      }
    >
      <div className="flex justify-end mb-4">
        <button
          onClick={() =>
            setTheme(theme === "dark" ? "light" : "dark")
          }
          className="border px-3 py-1 rounded"
        >
          Toggle Theme
        </button>
      </div>

      <Routes>
        <Route path="/" element={<InvoiceList />} />
        <Route path="/invoice/:id" element={<InvoiceDetail />} />
        <Route path="/new" element={<InvoiceForm />} />
        <Route path="/edit/:id" element={<InvoiceForm />} />
      </Routes>
    </div>
  );
}