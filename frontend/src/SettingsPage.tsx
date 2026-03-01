import { AccountSettings } from "./AccountSettings";
import { WebSettings } from "./WebSettings";
import { useActionState } from "react";

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

export function SettingsPage() {
  const [data, formAction] = useActionState<FormState, FormData>(
    submitAccountSettingsForm,
    { errors: {}, values: {} },
  );
  const [dataPreferences, formActionPreferences, isPending] = useActionState<
    Data,
    FormData
  >(submitPreferences, initialState);

  return (
    <div className="container-information">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <AccountSettings data={data} formAction={formAction} />
          {data?.success && (
            <div className="bg-green-200 p-4 rounded">
              <h2 className="text-xl font-bold">Changes Submitted</h2>
              <div>Username: {data.values.username}</div>
              <div>Email: {data.values.email}</div>
              <div>Password: ******** </div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <WebSettings
            data={dataPreferences}
            formActionPreferences={formActionPreferences}
            isPending={isPending}
          />
          {dataPreferences.message && (
            <div className="bg-green-200 p-4 rounded">
              <h2 className="text-xl font-bold">Changes Submitted</h2>
              {dataPreferences.changes.length > 0 ? (
                dataPreferences.changes.map((change) => (
                  <div key={change}>{change}</div>
                ))
              ) : (
                <div>No preference changes</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function submitAccountSettingsForm(
  prevState: FormState | undefined,
  formData: FormData,
): FormState {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const username = (formData.get("username") as string) || "";
  const email = (formData.get("email") as string) || "";
  const password = (formData.get("password") as string) || "";

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
  data.success = true;
  return data;
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
