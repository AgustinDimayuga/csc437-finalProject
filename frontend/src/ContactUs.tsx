import { useActionState } from "react";
import { ContactForm } from "./ContactForm";

export type ContactFormState = {
  errors: {
    subject?: string;
    firstName?: string;
    lastName?: string;
    message?: string;
    email?: string;
  };
  values: {
    subject?: string;
    firstName?: string;
    lastName?: string;
    message?: string;
    email?: string;
  };
  success?: boolean;
};

const initialState: ContactFormState = {
  errors: {},
  values: {},
  success: false,
};

function submitContactForm(
  prevState: ContactFormState,
  formData: FormData,
): ContactFormState {
  const data: ContactFormState = { errors: {}, values: {} };
  const subject = (formData.get("subject") as string) || "";
  const firstName = (formData.get("first-name") as string) || "";
  const lastName = (formData.get("last-name") as string) || "";
  const message = (formData.get("message") as string) || "";
  const email = (formData.get("email") as string) || "";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (subject.trim() === "") {
    data.errors.subject = "Subject Required";
  }
  if (firstName.trim() === "") {
    data.errors.firstName = "First name required";
  }
  if (lastName.trim() === "") {
    data.errors.lastName = "Last name required";
  }
  if (message.trim() === "") {
    data.errors.message = "Message required";
  }
  if (!emailRegex.test(email)) {
    data.errors.email = "Please enter a valid email address";
  }

  data.values.subject = subject;
  data.values.firstName = firstName;
  data.values.lastName = lastName;
  data.values.message = message;
  data.values.email = email;
  if (Object.keys(data.errors).length > 0) {
    return data;
  }
  data.success = true;
  return data;
}

export function ContactUs() {
  const [data, formAction] = useActionState<ContactFormState, FormData>(
    submitContactForm,
    initialState,
  );

  return (
    <div className="container-information ">
      <ContactForm data={data} formAction={formAction} />

      {data?.success && (
        <div className="bg-brand-200 p-4 rounded-xl mt-4">
          <h1 className="text-xl font-bold">Contact Request Submitted</h1>
          <div>
            Thanks{" "}
            <span className="text-accent-500">{data.values.firstName}</span>{" "}
            your message regarding{" "}
            <span className="text-accent-500">{data.values.subject}</span> has
            been submitted
          </div>
          <div>An agent will reach out and response via email soon! </div>
        </div>
      )}
    </div>
  );
}
