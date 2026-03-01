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
      className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:min-h-96"
    >
      <fieldset className="flex h-full flex-col gap-4">
        <legend className="mb-1 text-lg font-semibold text-slate-900">
          Web Preferences
        </legend>

        <label
          htmlFor="notifications"
          className="text-sm font-medium text-slate-700"
        >
          Notifications
        </label>
        <select
          id="notifications"
          name="notifications"
          defaultValue={data.notifications}
          className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-base text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        >
          <option>Email</option>
          <option>SMS</option>
          <option>None</option>
        </select>

        <label htmlFor="theme" className="text-sm font-medium text-slate-700">
          Theme
        </label>
        <select
          id="theme"
          name="theme"
          defaultValue={data.theme}
          className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-base text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        >
          <option>Light</option>
          <option>Dark</option>
        </select>

        <label htmlFor="language" className="text-sm font-medium text-slate-700">
          Language
        </label>
        <select
          id="language"
          name="language"
          defaultValue={data.language}
          className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-base text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        >
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
        </select>

        <button
          type="submit"
          disabled={isPending}
          className="mt-auto rounded-lg bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isPending ? "Saving..." : "Save Preferences"}
        </button>
        {data.message && <p className="text-sm text-slate-600">{data.message}</p>}
      </fieldset>
    </form>
  );
}
