"use client";

import { useState } from "react";
import { ArrowUpRight, X, Loader2 } from "lucide-react";

const PRESET_AMOUNTS = [25, 50, 100, 200];

export function TopUpButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [result, setResult] = useState<{ success?: boolean; message?: string } | null>(null);

  async function handleSubmit() {
    const value = parseFloat(amount);
    if (!value || value <= 0) return;

    setIsLoading(true);
    setResult(null);
    setShowConfirm(false);

    try {
      const res = await fetch("/api/portal/top-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: value }),
      });
      const data = await res.json();

      if (res.ok) {
        setResult({ success: true, message: `Invoice created for $${value.toFixed(2)}. ${data.message || "You will receive a payment link via email shortly."}` });
        setAmount("");
      } else {
        setResult({ success: false, message: data.error || "Failed to create invoice." });
      }
    } catch (err) {
      setResult({ success: false, message: "Network error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  }

  function handleClose() {
    setIsOpen(false);
    setShowConfirm(false);
    setResult(null);
  }

  return (
    <>
      <button
        onClick={() => { setIsOpen(true); setResult(null); setShowConfirm(false); }}
        className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-5 py-2.5 rounded-xl font-medium text-sm transition-all shadow-md hover:shadow-lg flex items-center"
      >
        Top Up Wallet <ArrowUpRight className="ml-2 h-4 w-4" />
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Top Up Your Wallet</h2>
              <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 space-y-5">
              <p className="text-sm text-gray-500">
                Select a preset amount or enter a custom value. A Zoho invoice will be generated and a payment link sent to your email.
              </p>

              {/* Preset chips */}
              <div className="flex gap-2 flex-wrap">
                {PRESET_AMOUNTS.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => { setAmount(String(preset)); setShowConfirm(false); }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                      amount === String(preset)
                        ? "bg-ple-navy text-white border-ple-navy shadow-sm"
                        : "bg-white text-gray-700 border-gray-200 hover:border-ple-navy/30 hover:bg-gray-50"
                    }`}
                  >
                    ${preset}
                  </button>
                ))}
              </div>

              {/* Custom input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Custom Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "" || /^\d*\.?\d{0,2}$/.test(val)) {
                        setAmount(val);
                        setShowConfirm(false);
                      }
                    }}
                    className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl text-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-ple-navy/20 focus:border-ple-navy transition-all"
                  />
                </div>
              </div>

              {/* Confirmation message */}
              {showConfirm && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm">
                  <p className="font-medium text-amber-800">Are you sure?</p>
                  <p className="text-amber-700 mt-1">
                    This will generate an invoice for <strong>${parseFloat(amount).toFixed(2)}</strong> and send a payment link to your email.
                  </p>
                </div>
              )}

              {/* Result message */}
              {result && (
                <div className={`p-3 rounded-lg text-sm ${result.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                  {result.message}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={handleClose}
                className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!showConfirm) {
                    setShowConfirm(true);
                  } else {
                    handleSubmit();
                  }
                }}
                disabled={isLoading || !amount || parseFloat(amount) <= 0}
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-2.5 rounded-xl font-medium text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isLoading ? (
                  <><Loader2 className="animate-spin h-4 w-4 mr-2" /> Processing...</>
                ) : showConfirm ? (
                  <>Yes, Generate Invoice</>
                ) : (
                  <>Generate Invoice</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
