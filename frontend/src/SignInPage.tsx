import React, { useActionState } from "react";
import { Link, useNavigate } from "react-router";
import { VALID_ROUTES } from "./shared/ValidRoutes.js";

interface SignInPageProps {
  setEmailAddress: React.Dispatch<React.SetStateAction<string>>;
  setAuthToken: React.Dispatch<React.SetStateAction<string>>;
  isRegistering?: boolean;
}

interface FormState {
  error?: string;
  fieldErrors?: {
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
    type?: string;
  };
}

async function apiRequest(url: string, body: Record<string, string>) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong. Please try again.");
  }
  return data as { token: string; email: string };
}

function loginUser(email: string, password: string) {
  return apiRequest("/api/auth/tokens", { email, password });
}

function registerUser(
  name: string,
  email: string,
  password: string,
  phone: string,
  type: string,
) {
  return apiRequest("/api/users", { name, email, password, phone, type });
}

export function SignInPage({
  setEmailAddress,
  setAuthToken,
  isRegistering = false,
}: SignInPageProps) {
  const navigate = useNavigate();

  const [state, formAction, isPending] = useActionState(
    async (_prev: FormState, formData: FormData): Promise<FormState> => {
      const email = (formData.get("email") as string)?.trim();
      const password = (formData.get("password") as string)?.trim();
      const fieldErrors: FormState["fieldErrors"] = {};

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email))
        fieldErrors.email = "Please enter a valid email address.";
      if (!password) fieldErrors.password = "Password cannot be blank.";

      if (isRegistering) {
        const name = (formData.get("name") as string)?.trim();
        const phone = (formData.get("phone") as string)?.trim();
        const type = (formData.get("type") as string)?.trim();
        if (!name) fieldErrors.name = "Name is required.";
        if (!phone) fieldErrors.phone = "Phone number is required.";
        if (!type) fieldErrors.type = "Please select an account type.";
      }

      if (Object.keys(fieldErrors).length > 0) return { fieldErrors };

      try {
        let data;
        if (isRegistering) {
          const name = (formData.get("name") as string).trim();
          const phone = (formData.get("phone") as string).trim();
          const type = (formData.get("type") as string).trim();
          data = await registerUser(name, email, password, phone, type);
        } else {
          data = await loginUser(email, password);
        }
        setAuthToken(data.token);
        setEmailAddress(data.email);
        navigate(VALID_ROUTES.HOME);
        return {};
      } catch (err) {
        return { error: (err as Error).message };
      }
    },
    {},
  );

  const inputClass =
    "w-full rounded-lg border border-brand-300 bg-brand-100 px-3 py-2 text-base text-brand-900 outline-none transition focus:border-brand-700 focus:ring-2 focus:ring-brand-200";

  return (
    <div className="container-information flex items-center justify-center">
      <form
        action={formAction}
        className="w-full max-w-sm rounded-xl border border-brand-200 bg-brand-100 p-8 shadow-sm"
      >
        <h1 className="mb-6 text-xl font-semibold text-brand-900">
          {isRegistering ? "Create an Account" : "Sign In"}
        </h1>

        {state.error && (
          <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {state.error}
          </p>
        )}

        {isRegistering && (
          <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-brand-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Jane Doe"
              disabled={isPending}
              className={inputClass}
              aria-invalid={!!state.fieldErrors?.name}
            />
            {state.fieldErrors?.name && (
              <span className="text-sm text-accent-500">
                {state.fieldErrors.name}
              </span>
            )}
          </div>
        )}

        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-brand-700">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="you@example.com"
            disabled={isPending}
            className={inputClass}
            aria-invalid={!!state.fieldErrors?.email}
          />
          {state.fieldErrors?.email && (
            <span className="text-sm text-accent-500">
              {state.fieldErrors.email}
            </span>
          )}
        </div>

        <div className="mb-4 flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-brand-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            disabled={isPending}
            className={inputClass}
            aria-invalid={!!state.fieldErrors?.password}
          />
          {state.fieldErrors?.password && (
            <span className="text-sm text-accent-500">
              {state.fieldErrors.password}
            </span>
          )}
        </div>

        {isRegistering && (
          <>
            <div className="mb-4 flex flex-col gap-2">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-brand-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+1 (555) 000-0000"
                disabled={isPending}
                className={inputClass}
                aria-invalid={!!state.fieldErrors?.phone}
              />
              {state.fieldErrors?.phone && (
                <span className="text-sm text-accent-500">
                  {state.fieldErrors.phone}
                </span>
              )}
            </div>

            <div className="mb-4 flex flex-col gap-2">
              <label
                htmlFor="type"
                className="text-sm font-medium text-brand-700"
              >
                Account Type
              </label>
              <select
                id="type"
                name="type"
                disabled={isPending}
                defaultValue=""
                className={inputClass}
                aria-invalid={!!state.fieldErrors?.type}
              >
                <option value="" disabled>
                  Select type…
                </option>
                <option value="student">Student</option>
                <option value="agent">Agent</option>
              </select>
              {state.fieldErrors?.type && (
                <span className="text-sm text-accent-500">
                  {state.fieldErrors.type}
                </span>
              )}
            </div>
          </>
        )}

        <div className="mb-6" />

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-brand-900 px-4 py-2 font-medium text-white transition hover:bg-brand-800 disabled:opacity-60"
        >
          {isPending
            ? "Please wait…"
            : isRegistering
              ? "Create Account"
              : "Sign In"}
        </button>

        <p className="mt-4 text-center text-sm text-brand-700">
          {isRegistering ? (
            <>
              Already have an account?{" "}
              <Link to={VALID_ROUTES.SIGNIN} className="underline">
                Sign in
              </Link>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <Link to={VALID_ROUTES.REGISTER} className="underline">
                Register
              </Link>
            </>
          )}
        </p>
      </form>
    </div>
  );
}
