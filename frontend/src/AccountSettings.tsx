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
      className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:min-h-96"
    >
      <fieldset className="flex h-full flex-col gap-4">
        <legend className="mb-1 text-lg font-semibold text-slate-900">
          Account Settings
        </legend>

        <label
          htmlFor="username"
          className="text-sm font-medium text-slate-700"
        >
          Username
        </label>
        <input
          ref={usernameRef}
          className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-base text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          type="text"
          id="username"
          name="username"
          autoComplete="off"
          placeholder="Your username"
          aria-invalid={!!data?.errors?.username}
          defaultValue={data?.values?.username}
        />
        {data?.errors?.username && (
          <span className="text-sm text-red-600">{data.errors.username}</span>
        )}

        <label htmlFor="email" className="text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          ref={emailRef}
          className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-base text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          type="text"
          id="email"
          name="email"
          placeholder="you@example.com"
          aria-invalid={!!data?.errors?.email}
        />
        {data?.errors?.email && (
          <span className="text-sm text-red-600">{data.errors.email}</span>
        )}

        <label
          htmlFor="password"
          className="text-sm font-medium text-slate-700"
        >
          Password
        </label>
        <input
          ref={passwordRef}
          className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-base text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          type="password"
          id="password"
          name="password"
          placeholder="********"
          aria-invalid={!!data?.errors?.password}
        />
        {data?.errors?.password && (
          <span className="text-sm text-red-600">{data.errors.password}</span>
        )}

        <button
          type="submit"
          className="mt-auto rounded-lg bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-800"
        >
          Save Changes
        </button>
      </fieldset>
    </form>
  );
}
