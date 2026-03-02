import { useActionState, useEffect, useRef } from "react";
import { useActionData } from "react-router";

interface SignInpageProps {
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  setEmailAddress: React.Dispatch<React.SetStateAction<string>>;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
}
interface FormInput {
  values: {
    userName: string;
    emailAddress: string;
  };
  errors: {
    userName?: string;
    emailAddress?: string;
  };
}
const initialInput: FormInput = {
  values: { userName: "", emailAddress: "" },
  errors: {},
};

export function SignInPage({
  setUserName,
  setEmailAddress,
  setIsSignedIn,
}: SignInpageProps) {
  const userNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const [data, formAction] = useActionState(
    (prevData: FormInput, formData: FormData) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const data: FormInput = {
        values: { userName: "", emailAddress: "" },
        errors: {},
      };
      data.values.emailAddress = formData.get("email") as string;
      data.values.userName = formData.get("userName") as string;
      if (data.values.userName.trim() === "") {
        data.errors.userName = "Please input a username";
      }
      if (!emailRegex.test(data.values.emailAddress)) {
        data.errors.emailAddress = "Please input a valid email address";
      }
      if (Object.keys(data.errors).length > 0) {
        return data;
      }
      setUserName(data.values.userName);
      setEmailAddress(data.values.emailAddress);
      setIsSignedIn(true);

      return data;
    },
    initialInput,
  );
  useEffect(() => {
    if (data?.errors.emailAddress && emailRef.current) {
      emailRef.current.focus();
    } else if (data?.errors.userName && userNameRef.current) {
      userNameRef.current.focus();
    }
  }, [data]);

  return (
    <>
      <div className="container-information flex items-center justify-center">
        <form
          action={formAction}
          className="w-full max-w-sm rounded-xl border border-brand-200 bg-brand-100 p-8 shadow-sm"
        >
          <h1 className="mb-6 text-xl font-semibold text-brand-900">Sign In</h1>

          <div className="mb-4 flex flex-col gap-2">
            <label
              htmlFor="userName"
              className="text-sm font-medium text-brand-700"
            >
              Username
            </label>
            <input
              type="text"
              ref={userNameRef}
              id="userName"
              name="userName"
              placeholder="Your username"
              defaultValue={data.values.userName}
              className="w-full rounded-lg border border-brand-300 bg-brand-100 px-3 py-2 text-base text-brand-900 outline-none transition focus:border-brand-700 focus:ring-2 focus:ring-brand-200"
              aria-invalid={!!data.errors.userName}
              aria-describedby={data.errors.userName}
            />
            {data.errors.userName && (
              <span className="text-sm text-accent-500">
                {data.errors.userName}
              </span>
            )}
          </div>

          <div className="mb-4 flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-brand-700"
            >
              Email
            </label>
            <input
              type="text"
              ref={emailRef}
              id="email"
              name="email"
              placeholder="you@example.com"
              defaultValue={data.values.emailAddress}
              className="w-full rounded-lg border border-brand-300 bg-brand-100 px-3 py-2 text-base text-brand-900 outline-none transition focus:border-brand-700 focus:ring-2 focus:ring-brand-200"
              aria-invalid={!!data.errors.emailAddress}
              aria-describedby={data.errors.emailAddress}
            />
            {data.errors.emailAddress && (
              <span className="text-sm text-accent-500">
                {data.errors.emailAddress}
              </span>
            )}
          </div>

          <div className="mb-6 flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-brand-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full rounded-lg border border-brand-300 bg-brand-100 px-3 py-2 text-base text-brand-900 outline-none transition focus:border-brand-700 focus:ring-2 focus:ring-brand-200"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-brand-900 px-4 py-2 font-medium text-white transition hover:bg-brand-800"
          >
            Sign In
          </button>
        </form>
      </div>
    </>
  );
}
