import { notFound } from "next/navigation";
import { findForm } from "../../../lib/forms";
import AuditForm from "./AuditForm";

export default async function FormPage({ params }) {
  const { id } = await params;
  const form = findForm(id);
  if (!form) notFound();
  return <AuditForm formId={id} form={form} />;
}

