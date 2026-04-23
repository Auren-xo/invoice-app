import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import DeleteModal from "../components/DeleteModal";

export default function InvoiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const data = JSON.parse(localStorage.getItem("invoices")) || [];
  const invoice = data.find((i) => i.id === id);

  if (!invoice) return <p>Not found</p>;

  const remove = () => {
    const updated = data.filter((i) => i.id !== id);
    localStorage.setItem("invoices", JSON.stringify(updated));
    navigate("/");
  };

  const markPaid = () => {
    const updated = data.map((i) =>
      i.id === id ? { ...i, status: "paid" } : i
    );
    localStorage.setItem("invoices", JSON.stringify(updated));
    navigate(0);
  };

  return (
    <div>
      <Link to="/">← Back</Link>

      <h2 className="font-bold mt-4">
        Invoice #{invoice.id}
      </h2>

      <p>{invoice.clientName}</p>
      <p>Status: {invoice.status}</p>

      <div className="flex gap-2 mt-4">
        <Link
          to={`/edit/${invoice.id}`}
          className="bg-blue-500 text-white px-3 py-1"
        >
          Edit
        </Link>

        <button
          onClick={() => setShowModal(true)}
          className="bg-red-500 text-white px-3 py-1"
        >
          Delete
        </button>

        {invoice.status !== "paid" && (
          <button
            onClick={markPaid}
            className="bg-green-500 text-white px-3 py-1"
          >
            Mark Paid
          </button>
        )}
      </div>

      {showModal && (
        <DeleteModal
          onClose={() => setShowModal(false)}
          onConfirm={remove}
        />
      )}
    </div>
  );
}