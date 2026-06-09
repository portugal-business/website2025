"use client";

import { ArrowRight, Check } from "lucide-react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { type ContactState, submitContact } from "@/app/[locale]/contact/actions";
import { cn } from "@/lib/utils";

// Dictionnaire de libellés du formulaire (passé depuis la page, déjà localisé).
// Lecture seule pour accepter directement les objets `as const` de la page.
export type FormCopy = {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly projectType: string;
  readonly projectTypeHint: string;
  readonly projectOptions: ReadonlyArray<{ readonly value: string; readonly label: string }>;
  readonly country: string;
  readonly timeframe: string;
  readonly timeframeOptions: ReadonlyArray<{ readonly value: string; readonly label: string }>;
  readonly message: string;
  readonly messageHint: string;
  readonly required: string;
  readonly submit: string;
  readonly sending: string;
  readonly successTitle: string;
  readonly successBody: string;
  readonly formError: string;
  // Messages d'erreur par clé renvoyée par le Server Action.
  readonly errors: Readonly<Record<string, string>>;
};

const initialState: ContactState = { status: "idle" };

const fieldBase =
  "mt-2 block w-full rounded-sm border bg-background px-4 text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
const inputCls = `${fieldBase} h-12`;
const labelCls = "font-sans text-xs uppercase tracking-[0.14em] text-foreground";

function SubmitButton({ copy }: { copy: FormCopy }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "group inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-accent px-7 font-sans text-[0.95rem] font-medium tracking-[0.01em] text-accent-foreground transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
      )}
    >
      {pending ? copy.sending : copy.submit}
      {!pending && (
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      )}
    </button>
  );
}

function FieldError({ copy, errorKey, id }: { copy: FormCopy; errorKey?: string; id: string }) {
  if (!errorKey) return null;
  return (
    <p id={id} className="mt-2 font-sans text-xs text-primary" role="alert">
      {copy.errors[errorKey] ?? copy.errors.generic}
    </p>
  );
}

export function ContactForm({ copy }: { copy: FormCopy }) {
  const [state, formAction] = useActionState(submitContact, initialState);
  const errors = state.fieldErrors ?? {};
  const v = state.values ?? {};

  if (state.status === "success") {
    return (
      <div className="border border-border bg-card">
        <div className="rule-brass" />
        <div className="flex flex-col items-start gap-4 p-8 lg:p-10">
          <span
            className="inline-grid h-11 w-11 place-items-center rounded-sm border border-accent text-accent"
            aria-hidden
          >
            <Check className="h-5 w-5" />
          </span>
          <h2 className="font-serif text-2xl">{copy.successTitle}</h2>
          <p className="leading-relaxed text-muted-foreground">{copy.successBody}</p>
        </div>
      </div>
    );
  }

  const describedBy = (key: keyof typeof errors, hintId?: string) =>
    [hintId, errors[key] ? `${String(key)}-error` : null].filter(Boolean).join(" ") || undefined;

  return (
    <form action={formAction} noValidate className="space-y-7">
      {state.status === "error" && state.formError && (
        <p
          className="rounded-sm border border-primary/30 bg-primary/[0.04] px-4 py-3 font-sans text-sm text-primary"
          role="alert"
        >
          {copy.formError}
        </p>
      )}

      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelCls}>
            {copy.firstName}
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            defaultValue={v.firstName ?? ""}
            aria-invalid={errors.firstName ? true : undefined}
            aria-describedby={describedBy("firstName")}
            className={cn(inputCls, errors.firstName ? "border-primary" : "border-border")}
          />
          <FieldError copy={copy} errorKey={errors.firstName} id="firstName-error" />
        </div>

        <div>
          <label htmlFor="lastName" className={labelCls}>
            {copy.lastName}
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            defaultValue={v.lastName ?? ""}
            aria-invalid={errors.lastName ? true : undefined}
            aria-describedby={describedBy("lastName")}
            className={cn(inputCls, errors.lastName ? "border-primary" : "border-border")}
          />
          <FieldError copy={copy} errorKey={errors.lastName} id="lastName-error" />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelCls}>
          {copy.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={v.email ?? ""}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={describedBy("email")}
          className={cn(inputCls, errors.email ? "border-primary" : "border-border")}
        />
        <FieldError copy={copy} errorKey={errors.email} id="email-error" />
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="projectType" className={labelCls}>
            {copy.projectType}
          </label>
          <select
            id="projectType"
            name="projectType"
            defaultValue={v.projectType ?? ""}
            aria-invalid={errors.projectType ? true : undefined}
            aria-describedby={describedBy("projectType", "projectType-hint")}
            className={cn(inputCls, errors.projectType ? "border-primary" : "border-border")}
          >
            <option value="" disabled>
              …
            </option>
            {copy.projectOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <p id="projectType-hint" className="mt-2 text-sm text-muted-foreground">
            {copy.projectTypeHint}
          </p>
          <FieldError copy={copy} errorKey={errors.projectType} id="projectType-error" />
        </div>

        <div>
          <label htmlFor="country" className={labelCls}>
            {copy.country}
          </label>
          <input
            id="country"
            name="country"
            type="text"
            autoComplete="country-name"
            required
            defaultValue={v.country ?? ""}
            aria-invalid={errors.country ? true : undefined}
            aria-describedby={describedBy("country")}
            className={cn(inputCls, errors.country ? "border-primary" : "border-border")}
          />
          <FieldError copy={copy} errorKey={errors.country} id="country-error" />
        </div>
      </div>

      <div>
        <label htmlFor="timeframe" className={labelCls}>
          {copy.timeframe}
        </label>
        <select
          id="timeframe"
          name="timeframe"
          defaultValue={v.timeframe ?? ""}
          aria-invalid={errors.timeframe ? true : undefined}
          aria-describedby={describedBy("timeframe")}
          className={cn(inputCls, errors.timeframe ? "border-primary" : "border-border")}
        >
          <option value="" disabled>
            …
          </option>
          {copy.timeframeOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <FieldError copy={copy} errorKey={errors.timeframe} id="timeframe-error" />
      </div>

      <div>
        <label htmlFor="message" className={labelCls}>
          {copy.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          defaultValue={v.message ?? ""}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describedBy("message", "message-hint")}
          className={cn(
            fieldBase,
            "py-3 leading-relaxed",
            errors.message ? "border-primary" : "border-border",
          )}
        />
        <p id="message-hint" className="mt-2 text-sm text-muted-foreground">
          {copy.messageHint}
        </p>
        <FieldError copy={copy} errorKey={errors.message} id="message-error" />
      </div>

      <div className="flex flex-wrap items-center gap-5 pt-1">
        <SubmitButton copy={copy} />
        <p className="font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
          {copy.required}
        </p>
      </div>
    </form>
  );
}
