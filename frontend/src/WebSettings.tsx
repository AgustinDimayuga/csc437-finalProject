import { Data } from "./SettingsPage";
interface WebSettingsProps {
  data: Data;
  formActionPreferences: (payload: FormData) => void;
  isPending: boolean;
}
export function WebSettings({
  data,
  formActionPreferences,
  isPending,
}: WebSettingsProps) {
  return (
    <form
      action={formActionPreferences}
      className="h-full rounded-xl border border-brand-200 bg-brand-100 p-6 shadow-sm"
    >
      <fieldset className="flex h-full flex-col gap-4">
        <legend className="mb-1 text-lg font-semibold text-brand-900">
          Web Preferences
        </legend>

        <label
          htmlFor="notifications"
          className="text-sm font-medium text-brand-700"
        >
          Notifications
        </label>
        <select
          id="notifications"
          name="notifications"
          defaultValue={data.notifications}
          className="w-full rounded-lg border border-brand-300 bg-brand-100 px-3 py-2 text-base text-brand-900 outline-none transition focus:border-brand-700 focus:ring-2 focus:ring-brand-200"
        >
          <option>Email</option>
          <option>SMS</option>
          <option>None</option>
        </select>

        <label htmlFor="theme" className="text-sm font-medium text-brand-700">
          Theme
        </label>
        <select
          id="theme"
          name="theme"
          defaultValue={data.theme}
          className="w-full rounded-lg border border-brand-300 bg-brand-100 px-3 py-2 text-base text-brand-900 outline-none transition focus:border-brand-700 focus:ring-2 focus:ring-brand-200"
        >
          <option>Light</option>
          <option>Dark</option>
        </select>

        <label
          htmlFor="language"
          className="text-sm font-medium text-brand-700"
        >
          Account Type
        </label>
        <select
          id="language"
          name="language"
          defaultValue={data.language}
          className="w-full rounded-lg border border-brand-300 bg-brand-100 px-3 py-2 text-base text-brand-900 outline-none transition focus:border-brand-700 focus:ring-2 focus:ring-brand-200"
        >
          <option>Student</option>
          <option>Real Estate Agent</option>
        </select>

        <button
          type="submit"
          disabled={isPending}
          className="mt-auto rounded-lg bg-brand-900 px-4 py-2 font-medium text-white transition hover:bg-brand-800 disabled:cursor-not-allowed disabled:bg-brand-400"
        >
          {isPending ? "Saving..." : "Save Preferences"}
        </button>
        {data.message && (
          <p className="text-sm text-brand-600">{data.message}</p>
        )}
      </fieldset>
    </form>
  );
}
