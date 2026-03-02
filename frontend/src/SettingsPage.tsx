import { AccountSettings } from "./AccountSettings";
import { WebSettings } from "./WebSettings";
import { useActionState, useEffect } from "react";

type FormState = {
  errors: {
    username?: string;
    email?: string;
    password?: string;
  };
  values: {
    username?: string;
    email?: string;
    password?: string;
  };
  success?: boolean;
};
export type Data = {
  notifications: string;
  theme: string;
  language: string;
  message: string | null;
  changes: string[];
};
const initialState: Data = {
  notifications: "Email",
  theme: "Light",
  language: "English",
  message: null,
  changes: [],
};

interface SignInpageProps {
  userName: string;
  emailAddress: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  setEmailAddress: React.Dispatch<React.SetStateAction<string>>;
}
export function SettingsPage({
  userName,
  emailAddress,
  setUserName,
  setEmailAddress,
}: SignInpageProps) {
  const [data, formAction] = useActionState<FormState, FormData>(
    (_prevState: FormState | undefined, formData: FormData) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const username = (formData.get("username") as string) || "";
      const email = (formData.get("email") as string) || "";
      const password = (formData.get("password") as string) || "";
      {
        /* TODO edit this shit later*/
      }

      const data: FormState = { errors: {}, values: {} };
      if (username.trim() === "") {
        data.errors.username = "Username is required";
      }

      if (!emailRegex.test(email)) {
        data.errors.email = "Please enter a valid email address";
      }

      if (password.trim().length < 5) {
        data.errors.password = "Please enter at least 5 characters";
      }

      if (Object.keys(data.errors).length > 0) {
        data.values.username = username;
        data.values.email = email;
        return data;
      }
      data.values.username = username;
      data.values.email = email;

      setEmailAddress(data.values.username);
      setUserName(data.values.username);
      data.success = true;
      return data;
    },
    { errors: {}, values: { username: userName, email: emailAddress } },
  );
  const [dataPreferences, formActionPreferences, isPending] = useActionState<
    Data,
    FormData
  >(submitPreferences, {
    ...initialState,
    theme: document.body.classList.contains("dark") ? "Dark" : "Light",
  });

  useEffect(() => {
    document.body.classList.toggle("dark", dataPreferences.theme === "Dark");
  }, [dataPreferences.theme]);

  return (
    <div className="container-information">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex h-full flex-col gap-4">
          <AccountSettings data={data} formAction={formAction} />
        </div>
        <div className="flex h-full flex-col gap-4">
          <WebSettings
            data={dataPreferences}
            formActionPreferences={formActionPreferences}
            isPending={isPending}
          />
        </div>
      </div>
    </div>
  );
}

function submitPreferences(prevState: Data, formData: FormData): Data {
  const notifications =
    (formData.get("notifications") as string) ?? prevState.notifications;
  const theme = (formData.get("theme") as string) ?? prevState.theme;
  const language = (formData.get("language") as string) ?? prevState.language;

  const changes: string[] = [];
  if (notifications !== prevState.notifications) {
    changes.push(
      `Notifications: ${prevState.notifications} -> ${notifications}`,
    );
  }
  if (theme !== prevState.theme) {
    changes.push(`Theme: ${prevState.theme} -> ${theme}`);
  }
  if (language !== prevState.language) {
    changes.push(`Language: ${prevState.language} -> ${language}`);
  }

  return {
    notifications,
    theme,
    language,
    message: "Preferences saved",
    changes,
  };
}
