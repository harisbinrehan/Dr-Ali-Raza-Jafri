"use client";

import { useId, useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Check } from "@/components/ui/Icons";

const fieldClass =
  "w-full rounded-sm border border-line-strong bg-card px-4 py-3 text-base text-ink outline-none transition-[border-color,box-shadow] placeholder:text-muted focus:border-ink focus:shadow-[0_0_0_3px_rgb(226_123_34/0.18)]";

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
      <div role="status" className="rounded-lg border border-success/25 bg-success/5 p-8 animate-rise">
        <span className="grid size-10 place-items-center rounded-full bg-success text-white">
          <Check className="size-5" />
        </span>
        <h2 className="mt-5 font-display text-2xl text-ink">Message sent</h2>
        <p className="mt-2 leading-relaxed text-muted">Thank you. We reply to most messages within one working day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <h2 className="font-display text-display-sm text-ink">Send a message</h2>
      <div>
        <label htmlFor={`${id}-name`} className="mb-2 block text-sm font-medium text-ink">
          Your name
        </label>
        <input id={`${id}-name`} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={fieldClass} />
      </div>
      <div>
        <label htmlFor={`${id}-email`} className="mb-2 block text-sm font-medium text-ink">
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
        <label htmlFor={`${id}-message`} className="mb-2 block text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id={`${id}-message`}
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          minLength={10}
          aria-describedby={`${id}-hint`}
          className={cn(fieldClass, "resize-y")}
        />
        <p id={`${id}-hint`} className="mt-2 text-xs text-muted">
          At least 10 characters.
        </p>
      </div>
      {error && (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      )}
      <Button type="submit" variant="primary" size="lg" disabled={!ready || state === "sending"} className="w-full sm:w-auto" arrow={state !== "sending"}>
        {state === "sending" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
