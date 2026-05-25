"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ContactFormModalProps {
  open: boolean;
  onClose: () => void;
  quoteTotal: number;
  quoteNote: string;
}

export function ContactFormModal({ open, onClose, quoteTotal, quoteNote }: ContactFormModalProps) {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        body: JSON.stringify({ ...form, quoteNote }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Submission failed");
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setError(null);
    setForm({ firstName: "", lastName: "", email: "", phone: "" });
    onClose();
  };

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && handleClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=open]:fade-in" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-card border border-border rounded-2xl p-6 shadow-2xl data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95 focus:outline-none">
          <Dialog.Close
            onClick={handleClose}
            className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </Dialog.Close>

          {success ? (
            <div className="flex flex-col items-center text-center gap-4 py-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-1">Quote Sent!</h2>
                <p className="text-muted-foreground text-sm">
                  We&apos;ll get back to you shortly with your personalized quote.
                </p>
              </div>
              <Button onClick={handleClose} className="mt-2 w-full">Done</Button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <Dialog.Title className="text-xl font-bold">Request Your Quote</Dialog.Title>
                <Dialog.Description className="text-muted-foreground text-sm mt-1">
                  Estimated total:{" "}
                  <span className="text-primary font-semibold">${quoteTotal.toLocaleString()}</span>
                  {" "}— Fill in your details and we&apos;ll be in touch.
                </Dialog.Description>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">First name</label>
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      required
                      className={cn(
                        "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm",
                        "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
                      )}
                      placeholder="Jane"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Last name</label>
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      required
                      className={cn(
                        "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm",
                        "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
                      )}
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className={cn(
                      "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm",
                      "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
                    )}
                    placeholder="jane@example.com"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Phone</label>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    className={cn(
                      "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm",
                      "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
                    )}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}

                <Button type="submit" disabled={loading} className="w-full gap-2">
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loading ? "Sending…" : "Send Quote Request"}
                </Button>
              </form>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
