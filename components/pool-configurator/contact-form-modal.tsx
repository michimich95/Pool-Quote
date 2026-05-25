"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface QuoteData {
  pool_type: string;
  pool_dimensions: string;
  pool_glass_size: string;
  pool_finishes_interior: string;
  pool_finishes_exterior: string;
  pool_premium_features: string;
  pool_expected_budget: string;
}

interface ContactFormModalProps {
  open: boolean;
  onClose: () => void;
  quoteTotal: number;
  quoteData: QuoteData;
}

const inputCls = cn(
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm",
  "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
);

const selectCls = cn(inputCls, "cursor-pointer");

export function ContactFormModal({ open, onClose, quoteTotal, quoteData }: ContactFormModalProps) {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    city: "",
    postal_code: "",
    pool_location: "",
    pool_expected_budget: "",
    pool_installation_date: "",
    preferred_time_to_contact: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          pool_type:              quoteData.pool_type,
          pool_dimensions:        quoteData.pool_dimensions,
          pool_glass_size:        quoteData.pool_glass_size,
          pool_finishes_interior: quoteData.pool_finishes_interior,
          pool_finishes_exterior: quoteData.pool_finishes_exterior,
          premium_features:       quoteData.pool_premium_features,
          pool_premium_features:  quoteData.pool_premium_features,
          pool_expected_budget:   form.pool_expected_budget,
          led_lighting:           "",
          pool_led_light:         "",
          precio_final:           `$${quoteTotal.toLocaleString()}`,
        }),
      });
      const text = await res.text();
      let data: Record<string, unknown> = {};
      try { if (text) data = JSON.parse(text); } catch { /* empty */ }
      if (!res.ok) {
        const msg = (data?.error as { message?: string } | undefined)?.message ?? "Submission failed";
        throw new Error(msg);
      }
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (loading) return;
    setSuccess(false);
    setError(null);
    setForm({
      full_name: "", email: "", phone: "", city: "", postal_code: "",
      pool_location: "", pool_expected_budget: "", pool_installation_date: "",
      preferred_time_to_contact: "",
    });
    onClose();
  };

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && handleClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=open]:fade-in" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg max-h-[90vh] flex flex-col bg-card border border-border rounded-2xl shadow-2xl data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95 focus:outline-none">

          {/* Header */}
          <div className="flex items-start justify-between p-6 border-b border-border flex-shrink-0">
            <div>
              <Dialog.Title className="text-xl font-bold">Request Your Quote</Dialog.Title>
              <Dialog.Description className="text-muted-foreground text-sm mt-1">
                Estimated total:{" "}
                <span className="text-primary font-semibold">${quoteTotal.toLocaleString()}</span>
                {" "}· {quoteData.pool_type} · {quoteData.pool_dimensions}
              </Dialog.Description>
            </div>
            <Dialog.Close onClick={handleClose} className="text-muted-foreground hover:text-foreground transition-colors ml-4 mt-0.5">
              <X className="w-5 h-5" />
            </Dialog.Close>
          </div>

          {success ? (
            <div className="flex flex-col items-center text-center gap-4 p-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-1">Request Sent!</h2>
                <p className="text-muted-foreground text-sm">
                  We&apos;ll be in touch shortly with your personalized quote.
                </p>
              </div>
              <Button onClick={handleClose} className="w-full mt-2">Done</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
              <div className="flex-1 overflow-y-auto p-6 space-y-5">

                {/* Contact info */}
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                    Contact Info
                  </p>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium block mb-1.5">Full name <span className="text-destructive">*</span></label>
                      <input name="full_name" value={form.full_name} onChange={handleChange} required
                        className={inputCls} placeholder="Jane Doe" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium block mb-1.5">Email <span className="text-destructive">*</span></label>
                        <input name="email" type="email" value={form.email} onChange={handleChange} required
                          className={inputCls} placeholder="jane@example.com" />
                      </div>
                      <div>
                        <label className="text-sm font-medium block mb-1.5">Phone <span className="text-destructive">*</span></label>
                        <input name="phone" type="tel" value={form.phone} onChange={handleChange} required
                          className={inputCls} placeholder="+1 555 000 0000" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium block mb-1.5">City</label>
                        <input name="city" value={form.city} onChange={handleChange}
                          className={inputCls} placeholder="Miami" />
                      </div>
                      <div>
                        <label className="text-sm font-medium block mb-1.5">Postal code</label>
                        <input name="postal_code" value={form.postal_code} onChange={handleChange}
                          className={inputCls} placeholder="33101" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project details */}
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                    Project Details
                  </p>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium block mb-1.5">Installation location</label>
                      <input name="pool_location" value={form.pool_location} onChange={handleChange}
                        className={inputCls} placeholder="Address or area where the pool will be installed" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium block mb-1.5">Expected budget</label>
                        <select name="pool_expected_budget" value={form.pool_expected_budget} onChange={handleChange}
                          className={selectCls}>
                          <option value="">Select range</option>
                          <option value="Under $20,000">Under $20,000</option>
                          <option value="$20,000 – $30,000">$20,000 – $30,000</option>
                          <option value="$30,000 – $40,000">$30,000 – $40,000</option>
                          <option value="Over $40,000">Over $40,000</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium block mb-1.5">Installation date</label>
                        <input name="pool_installation_date" value={form.pool_installation_date} onChange={handleChange}
                          className={inputCls} placeholder="e.g. Summer 2025" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1.5">Best time to contact</label>
                      <select name="preferred_time_to_contact" value={form.preferred_time_to_contact} onChange={handleChange}
                        className={selectCls}>
                        <option value="">Select a time</option>
                        <option value="Morning (9am – 12pm)">Morning (9am – 12pm)</option>
                        <option value="Afternoon (12pm – 5pm)">Afternoon (12pm – 5pm)</option>
                        <option value="Evening (5pm – 8pm)">Evening (5pm – 8pm)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}
              </div>

              {/* Sticky footer */}
              <div className="p-6 pt-4 border-t border-border flex-shrink-0">
                <Button type="submit" disabled={loading} className="w-full gap-2">
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loading ? "Sending…" : "Send Quote Request"}
                </Button>
              </div>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
