import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function InvoiceForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [clientName, setClientName] = useState("");
  const [items, setItems] = useState([{ name: "", qty: 1, price: 0 }]);

  useEffect(() => {
    if (!id) return;

    const data = JSON.parse(localStorage.getItem("invoices")) || [];
    const found = data.find((i) => i.id === id);

    if (found) {
      setClientName(found.clientName);
      setItems(found.items || []);
    }
  }, [id]);

  const submit = (status) => {
    if (!clientName.trim()) {
      alert("Client required");
      return;
    }

    const data = JSON.parse(localStorage.getItem("invoices")) || [];

    const invoice = {
      id: id || Date.now().toString(),
      clientName,
      items,
      status, // ✅ IMPORTANT FIX
    };

    let updated;

    if (id) {
      updated = data.map((i) =>
        i.id === id ? invoice : i
      );
    } else {
      updated = [...data, invoice];
    }

    localStorage.setItem("invoices", JSON.stringify(updated));
    navigate("/");
  };

  return (
    <div>
      <button onClick={() => navigate(-1)}>← Back</button>

      <h2 className="font-bold mt-4">
        {id ? "Edit Invoice" : "New Invoice"}
      </h2>

      <label>Client Name</label>
      <input
        className="border p-2 w-full my-2"
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
      />

      {items.map((item, i) => (
        <div key={i} className="flex gap-2 mb-2">
          <input
            placeholder="Item"
            className="border p-2"
            value={item.name}
            onChange={(e) => {
              const copy = [...items];
              copy[i].name = e.target.value;
              setItems(copy);
            }}
          />

          <input
            type="number"
            className="border p-2 w-20"
            value={item.qty}
            onChange={(e) => {
              const copy = [...items];
              copy[i].qty = e.target.value;
              setItems(copy);
            }}
          />

          <input
            type="number"
            className="border p-2 w-24"
            value={item.price}
            onChange={(e) => {
              const copy = [...items];
              copy[i].price = e.target.value;
              setItems(copy);
            }}
          />
        </div>
      ))}

      <button
        onClick={() =>
          setItems([...items, { name: "", qty: 1, price: 0 }])
        }
        className="mb-4"
      >
        + Add Item
      </button>

      <div className="flex gap-2">
        <button
          onClick={() => submit("draft")}
          className="bg-gray-500 text-white px-3 py-1"
        >
          Save Draft
        </button>

        <button
          onClick={() => submit("pending")}
          className="bg-purple-600 text-white px-3 py-1"
        >
          Save
        </button>
      </div>
    </div>
  );
}