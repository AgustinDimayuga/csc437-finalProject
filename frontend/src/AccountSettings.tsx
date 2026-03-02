import { useRef, useEffect } from "react";
interface AccountSettingsProps {
  formAction: (payload: FormData) => void;
  data?: {
    values?: {
      username?: string;
      email?: string;
      password?: string;
    };
    errors?: {
      username?: string;
      email?: string;
      password?: string;
    };
    success?: boolean;
  };
}
export function AccountSettings({ data, formAction }: AccountSettingsProps) {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (data?.errors?.username && usernameRef.current) {
      usernameRef.current.focus();
    } else if (data?.errors?.email && emailRef.current) {
      emailRef.current.focus();
    } else if (data?.errors?.password && passwordRef.current) {
      passwordRef.current.focus();
    }
  }, [data]);

  return (
    <form
      action={formAction}
      className="h-full rounded-xl border border-brand-200 bg-brand-100 p-6 shadow-sm"
    >
      <fieldset className="flex h-full flex-col gap-4">
        <legend className="mb-1 text-lg font-semibold text-brand-900">
          Account Settings
        </legend>

        <label
          htmlFor="username"
          className="text-sm font-medium text-brand-700"
        >
          Username
        </label>
        <input
          ref={usernameRef}
          className="w-full rounded-lg border border-brand-300 bg-brand-100 px-3 py-2 text-base text-brand-900 outline-none transition focus:border-brand-700 focus:ring-2 focus:ring-brand-200"
          type="text"
          id="username"
          name="username"
          autoComplete="off"
          placeholder="Your username"
          aria-invalid={!!data?.errors?.username}
          defaultValue={data?.values?.username}
        />
        {data?.errors?.username && (
          <span className="text-sm text-accent-500">{data.errors.username}</span>
        )}

        <label htmlFor="email" className="text-sm font-medium text-brand-700">
          Email
        </label>
        <input
          ref={emailRef}
          className="w-full rounded-lg border border-brand-300 bg-brand-100 px-3 py-2 text-base text-brand-900 outline-none transition focus:border-brand-700 focus:ring-2 focus:ring-brand-200"
          type="text"
          id="email"
          name="email"
          placeholder="you@example.com"
          aria-invalid={!!data?.errors?.email}
          defaultValue={data?.values?.email}
        />
        {data?.errors?.email && (
          <span className="text-sm text-accent-500">{data.errors.email}</span>
        )}

        <label
          htmlFor="password"
          className="text-sm font-medium text-brand-700"
        >
          Password
        </label>
        <input
          ref={passwordRef}
          className="w-full rounded-lg border border-brand-300 bg-brand-100 px-3 py-2 text-base text-brand-900 outline-none transition focus:border-brand-700 focus:ring-2 focus:ring-brand-200"
          type="password"
          id="password"
          name="password"
          placeholder="********"
          aria-invalid={!!data?.errors?.password}
        />
        {data?.errors?.password && (
          <span className="text-sm text-accent-500">{data.errors.password}</span>
        )}

        <button
          type="submit"
          className="mt-auto rounded-lg bg-brand-900 px-4 py-2 font-medium text-white transition hover:bg-brand-800"
        >
          Save Changes
        </button>
        {data?.success && (
          <p className="text-sm text-brand-600">Changes saved</p>
        )}
      </fieldset>
    </form>
  );
}
