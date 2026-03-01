import { useActionState } from "react";
import { ContactForm } from "./ContactForm";

export type ContactFormState = {
  errors: {
    subject?: string;
    firstName?: string;
    lastName?: string;
    message?: string;
  };
  values: {
    subject?: string;
    firstName?: string;
    lastName?: string;
    message?: string;
  };
};

const initialState: ContactFormState = {
  errors: {},
  values: {},
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

  if (Object.keys(data.errors).length > 0) {
    data.values.subject = subject;
    data.values.firstName = firstName;
    data.values.lastName = lastName;
    data.values.message = message;
    return data;
  }
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

      {data?.values && (
        <div className="bg-green-200 p-4 rounded-xl mt-4">
          <h1 className="text-xl font-bold">Contact Request Submitted</h1>
          <div>
            Thanks {data.values.firstName} your message regarding{" "}
            {data.values.subject}
            {data.values.subject} has been submitted
          </div>
          <div>An agent will reach out and response via email soon! </div>
        </div>
      )}
    </div>
  );
}
