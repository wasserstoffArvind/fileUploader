"use client";

import { useRouter } from "next/navigation";
import useDataStore from "./zustand/Store";

export default function DisplayPage() {
  const router = useRouter();
  const data = useDataStore((state) => state.data);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0d1b0d] to-[#001a00] text-green-400 px-4">
        <p className="text-green-300 text-lg">No data to display.</p>
      </div>
    );
  }

  const { statement_details, transactions, total_purchase_amount, verification_status } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0d1b0d] to-[#001a00] text-green-400 px-4 py-8">
      <div className="max-w-5xl mx-auto p-6 rounded-3xl border border-green-800 bg-black/40 backdrop-blur-xl shadow-2xl">
        <h2 className="text-3xl font-extrabold text-green-400 mb-6 text-center tracking-wide">
          Statement Overview
        </h2>

        <div className="mb-6 p-4 bg-black/30 backdrop-blur-md rounded-xl border border-green-700">
          <h3 className="text-xl font-semibold mb-2">User Details</h3>
          {Object.entries(statement_details).map(([key,value])=>(<p key={key} className="pt-1"><span className="font-semibold">{key}:</span> {value}</p>))}
          {/* <p><span className="font-semibold">Name:</span> {statement_details.userName}</p>
          <p><span className="font-semibold">Bank:</span> {statement_details.bankName}</p>
          <p><span className="font-semibold">Card:</span> {statement_details.cardName}</p> */}
        </div>

        <div className="mb-6 p-4 bg-black/30 backdrop-blur-md rounded-xl border border-green-700 overflow-x-auto">
          <h3 className="text-xl font-semibold mb-2">Transactions</h3>
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-green-700">
                <th className="py-2 px-3">Date</th>
                <th className="py-2 px-3">Description</th>
                <th className="py-2 px-3">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, index) => (
                <tr key={index} className="border-b border-green-800">
                  <td className="py-2 px-3">{tx.date}</td>
                  <td className="py-2 px-3">{tx.description}</td>
                  <td className="py-2 px-3">{tx.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-black/30 backdrop-blur-md rounded-xl border border-green-700 flex justify-between items-center mb-6">
          <p className="text-lg font-semibold">
            Total Purchase Amount: <span className="text-green-200">{total_purchase_amount.toFixed(2)}</span>
          </p>
          <p className={`text-lg font-semibold ${verification_status.includes("Success") ? "text-green-400" : "text-red-400"}`}>
            Status: {verification_status}
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => router.back()}
            className="mt-4 px-6 py-2 rounded-xl bg-green-700 hover:bg-green-600 text-black font-semibold shadow-lg transition"
          >
            ⬅ Back
          </button>
        </div>
      </div>
    </div>
  );
}
