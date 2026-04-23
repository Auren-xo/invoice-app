import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("invoices")) || [];
    setInvoices(data);
  }, []);

  const filtered =
    filter === "all"
      ? invoices
      : invoices.filter((i) => i.status === filter);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Invoices</h1>

        <select
          className="border px-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="draft">Draft</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p>No invoices</p>
      ) : (
        filtered.map((inv) => (
          <Link
            key={inv.id}
            to={`/invoice/${inv.id}`}
            className="block p-4 bg-white mb-3 rounded shadow"
          >
            <p className="font-bold">#{inv.id}</p>
            <p>{inv.clientName}</p>

            <p className="text-sm font-medium">
              Status: {inv.status}
            </p>
          </Link>
        ))
      )}
    </div>
  );
}