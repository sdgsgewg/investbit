import React from "react";
import { CrudPageHeader } from "../../templates/crud/CrudPageHeader";
import { FormSize } from "@/types/form";
import FormSectionWrapper from "@/components/wrappers/FormSectionWrapper";

interface Props {
  title: string;
  formSize: FormSize;
  form: React.ReactNode;
}

const FormPageLayout = ({ title, formSize, form }: Props) => {
  return (
    <>
      <CrudPageHeader title={title} showBackButton />

      <FormSectionWrapper formSize={formSize}>{form}</FormSectionWrapper>
    </>
  );
};

export default FormPageLayout;
