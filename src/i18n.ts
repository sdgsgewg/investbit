import { getRequestConfig } from "next-intl/server";
import { routing } from "./navigation";

async function getMessages(locale: string) {
  const theme = (await import(`./messages/${locale}/theme.json`)).default;
  const lang = (await import(`./messages/${locale}/lang.json`)).default;
  const navigation = (await import(`./messages/${locale}/navigation.json`))
    .default;
  const footer = (await import(`./messages/${locale}/footer.json`)).default;
  const common = (await import(`./messages/${locale}/common.json`)).default;
  const auth = (await import(`./messages/${locale}/auth.json`)).default;
  const entities = (await import(`./messages/${locale}/entities.json`)).default;

  const publicMessages = {
    home: (await import(`./messages/${locale}/public/home.json`)).default,
    learn: (await import(`./messages/${locale}/public/learn.json`)).default,
    glossary: (await import(`./messages/${locale}/public/glossary.json`))
      .default,
    mutualFund: {
      performance: (
        await import(`./messages/${locale}/public/mutual-fund/performance.json`)
      ).default,
    },
  };

  const dashboardMessages = {
    mutualFund: {
      categories: (
        await import(
          `./messages/${locale}/dashboard/mutual-fund/categories.json`
        )
      ).default,
      items: (
        await import(`./messages/${locale}/dashboard/mutual-fund/items.json`)
      ).default,
      records: (
        await import(`./messages/${locale}/dashboard/mutual-fund/records.json`)
      ).default,
    },
  };

  return {
    theme,
    lang,
    navigation,
    footer,
    common,
    auth,
    public: publicMessages,
    dashboard: dashboardMessages,
    entities,
  };
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as "en" | "id")) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: await getMessages(locale),
  };
});
