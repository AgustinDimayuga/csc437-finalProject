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
  const emailRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (data?.errors?.subject && subjectRef.current) {
      subjectRef.current.focus();
    } else if (data?.errors?.firstName && firstNameRef.current) {
      firstNameRef.current.focus();
    } else if (data?.errors?.lastName && lastNameRef.current) {
      lastNameRef.current.focus();
    } else if (data?.errors?.message && messageRef.current) {
      messageRef.current.focus();
    } else if (data?.errors?.email && emailRef.current) {
      emailRef.current.focus();
    }
  }, [data]);
  return (
    <form
      action={formAction}
      className="rounded-2xl border border-brand-200 bg-brand-100 p-6 shadow-sm md:p-8"
    >
      <div className="mb-4 flex flex-col gap-2">
        <label
          htmlFor="subject"
          className="text-sm font-semibold text-brand-700"
        >
          Subject
        </label>
        <input
          name="subject"
          id="subject"
          type="text"
          aria-invalid={!!data?.errors?.subject}
          ref={subjectRef}
          className="w-full rounded-lg border border-brand-300 bg-brand-100 px-3 py-2 text-brand-900 outline-none transition focus:border-brand-700 focus:ring-2 focus:ring-brand-200"
          defaultValue={data.values.subject}
        />
        {data?.errors?.subject && (
          <span className="text-sm text-accent-500">{data.errors.subject}</span>
        )}
      </div>
      <div className="mb-4 flex flex-col gap-2">
        <label
          htmlFor="first-name"
          className="text-sm font-semibold text-brand-700"
        >
          First Name
        </label>
        <input
          name="first-name"
          id="first-name"
          type="text"
          aria-invalid={!!data.errors?.firstName}
          ref={firstNameRef}
          className="w-full rounded-lg border border-brand-300 bg-brand-100 px-3 py-2 text-brand-900 outline-none transition focus:border-brand-700 focus:ring-2 focus:ring-brand-200"
          defaultValue={data.values.firstName}
        />

        {data?.errors?.firstName && (
          <span className="text-sm text-accent-500">
            {data.errors.firstName}
          </span>
        )}
      </div>
      <div className="mb-4 flex flex-col gap-2">
        <label
          htmlFor="last-name"
          className="text-sm font-semibold text-brand-700"
        >
          Last Name
        </label>
        <input
          name="last-name"
          id="last-name"
          type="text"
          aria-invalid={!!data.errors?.lastName}
          ref={lastNameRef}
          className="w-full rounded-lg border border-brand-300 bg-brand-100 px-3 py-2 text-brand-900 outline-none transition focus:border-brand-700 focus:ring-2 focus:ring-brand-200"
          defaultValue={data.values.lastName}
        />

        {data?.errors?.lastName && (
          <span className="text-sm text-accent-500">
            {data.errors.lastName}
          </span>
        )}
      </div>

      <div className="mb-4 flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-semibold text-brand-700">
          Email
        </label>
        <input
          name="email"
          id="email"
          type="text"
          aria-invalid={!!data.errors?.email}
          ref={emailRef}
          className="w-full rounded-lg border border-brand-300 bg-brand-100 px-3 py-2 text-brand-900 outline-none transition focus:border-brand-700 focus:ring-2 focus:ring-brand-200"
          defaultValue={data.values.email}
        />

        {data?.errors?.email && (
          <span className="text-sm text-accent-500">{data.errors.email}</span>
        )}
      </div>
      <div className="mb-6 flex flex-col gap-2">
        <label
          htmlFor="message"
          className="text-sm font-semibold text-brand-700"
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
          className="min-h-32 w-full rounded-lg border border-brand-300 bg-brand-100 px-3 py-2 text-brand-900 outline-none transition placeholder:text-brand-500 focus:border-brand-700 focus:ring-2 focus:ring-brand-200"
          defaultValue={data.values.message}
        ></textarea>

        {data?.errors?.message && (
          <span className="text-sm text-accent-500">{data.errors.message}</span>
        )}
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-brand-900 px-4 py-2 font-medium text-white transition hover:bg-brand-800 disabled:cursor-not-allowed disabled:bg-brand-400 md:w-auto"
      >
        Submit Form
      </button>
    </form>
  );
}
