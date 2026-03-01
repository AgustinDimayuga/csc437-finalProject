import { useActionState } from "react";
import { ContactForm } from "./ContactForm";

export type ContactFormState = {
  errors?: {
    subject?: string;
    firstName?: string;
    lastName?: string;
    message?: string;
  };
  values?: {
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
  const errors: ContactFormState["errors"] = {};
  const subject = (formData.get("subject") as string) || "";
  const firstName = (formData.get("first-name") as string) || "";
  const lastName = (formData.get("last-name") as string) || "";
  const message = (formData.get("message") as string) || "";
  if (subject.trim() === "") {
    errors.subject = "Subject required";
  }
  if (firstName.trim() === "") {
    errors.firstName = "First name required";
  }
  if (lastName.trim() === "") {
    errors.lastName = "Last name required";
  }
  if (message.trim() === "") {
    errors.message = "Message required";
  }
  if (Object.keys(errors).length > 0) {
    return { errors };
  }
  window.alert("hi");
  return {
    values: { subject, firstName, lastName, message },
  };
}

export function ContactUs() {
  const [data, formAction] = useActionState<ContactFormState, FormData>(
    submitContactForm,
    initialState,
  );

  return (
    <div className="container-information ">
      <ContactForm data={data} formAction={formAction} />
    </div>
  );
}
