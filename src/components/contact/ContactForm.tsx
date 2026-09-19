"use client";

import { useId, useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

const fieldClass =
  "w-full border-b border-line-strong bg-transparent py-3 text-[1.0625rem] text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-ink";

/**
 * Same request as the platform's contact form: POST /api/catalog/contact with
 * { name, email, message }, enabled once there is an email and a message of
 * at least ten characters.
 */
export function ContactForm() {
  const id = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  const ready = email.includes("@") && message.trim().length >= 10;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!ready || state === "sending") return;
    setState("sending");
    setError(null);
    try {
      const res = await fetch("/api/catalog/contact", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error?.message ?? "Your message could not be sent. Please try again.");
      }
      setState("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Your message could not be sent. Please try again.");
      setState("idle");
    }
  }

  if (state === "sent") {
    return (
      <div role="status" className="border-t border-ink pt-10 animate-rise">
        <h2 className="font-display text-h3 text-ink">Message sent</h2>
        <p className="mt-4 max-w-md leading-relaxed text-ink-soft">Thank you. We reply to most messages within one working day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-9" noValidate>
      <h2 className="font-display text-h3 text-ink">Send a message</h2>
      <div>
        <label htmlFor={`${id}-name`} className="block text-[0.8125rem] text-muted">
          Your name
        </label>
        <input id={`${id}-name`} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={fieldClass} />
      </div>
      <div>
        <label htmlFor={`${id}-email`} className="block text-[0.8125rem] text-muted">
          Email
        </label>
        <input
          id={`${id}-email`}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          inputMode="email"
          required
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor={`${id}-message`} className="block text-[0.8125rem] text-muted">
          Message
        </label>
        <textarea
          id={`${id}-message`}
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          minLength={10}
          aria-describedby={`${id}-hint`}
          className={cn(fieldClass, "resize-y leading-relaxed")}
        />
        <p id={`${id}-hint`} className="mt-2 text-[0.8125rem] text-muted">
          At least 10 characters.
        </p>
      </div>
      {error && (
        <p role="alert" className="text-[0.875rem] text-danger">
          {error}
        </p>
      )}
      <Button type="submit" size="lg" disabled={!ready || state === "sending"} arrow={state !== "sending"}>
        {state === "sending" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
