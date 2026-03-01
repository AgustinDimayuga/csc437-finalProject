import { ContactFormState } from "./ContactUs";
import { useEffect } from "react";
import { useRef } from "react";

interface ContactFormProps {
  data: ContactFormState;
  formAction: (payload: FormData) => void;
}
export function ContactForm({ data, formAction }: ContactFormProps) {
  const subjectRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    if (data?.errors?.subject && subjectRef.current) {
      subjectRef.current.focus();
    } else if (data?.errors?.firstName && firstNameRef.current) {
      firstNameRef.current.focus();
    } else if (data?.errors?.lastName && lastNameRef.current) {
      lastNameRef.current.focus();
    } else if (data?.errors?.message && messageRef.current) {
      messageRef.current.focus();
    }
  }, [data]);
  return (
    <form
      action={formAction}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
    >
      <div className="mb-4 flex flex-col gap-2">
        <label
          htmlFor="last-name"
          className="text-sm font-semibold text-slate-700"
        >
          Subject
        </label>
        <input
          name="subject"
          id="subject"
          type="text"
          aria-invalid={!!data?.errors?.subject}
          ref={subjectRef}
          className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
        {data?.errors?.subject && (
          <span className="text-sm text-red-600">{data.errors.subject}</span>
        )}
      </div>
      <div className="mb-4 flex flex-col gap-2">
        <label
          htmlFor="first-name"
          className="text-sm font-semibold text-slate-700"
        >
          First Name
        </label>
        <input
          name="first-name"
          id="first-name"
          type="text"
          aria-invalid={!!data.errors?.firstName}
          ref={firstNameRef}
          className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        {data?.errors?.firstName && (
          <span className="text-sm text-red-600">{data.errors.firstName}</span>
        )}
      </div>
      <div className="mb-4 flex flex-col gap-2">
        <label
          htmlFor="last-name"
          className="text-sm font-semibold text-slate-700"
        >
          Last Name
        </label>
        <input
          name="last-name"
          id="last-name"
          type="text"
          aria-invalid={!!data.errors?.lastName}
          ref={lastNameRef}
          className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        {data?.errors?.lastName && (
          <span className="text-sm text-red-600">{data.errors.lastName}</span>
        )}
      </div>
      <div className="mb-6 flex flex-col gap-2">
        <label
          htmlFor="message"
          className="text-sm font-semibold text-slate-700"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Describe your listing..."
          aria-invalid={!!data.errors?.message}
          ref={messageRef}
          className="min-h-32 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        ></textarea>

        {data?.errors?.message && (
          <span className="text-sm text-red-600">{data.errors.message}</span>
        )}
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400 md:w-auto"
      >
        Save prefences
      </button>
    </form>
  );
}
