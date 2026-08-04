"use client";

import { useTranslations } from "next-intl";

import { HOME_EXPLORE_FEATURES } from "@/constants/home/explore";

import {
  CenteredContentSection,
  type CenteredContentSectionProps,
} from "../Section";
import ExploreCardWrapper from "./ExploreCardWrapper";

export default function ExploreSection() {
  const t = useTranslations("public.home.explore");

  const data: CenteredContentSectionProps = {
    title: t("title"),
    subtitle: t("subtitle"),
    children: <ExploreCardWrapper features={HOME_EXPLORE_FEATURES} />,
  };

  return <CenteredContentSection {...data} />;
}
