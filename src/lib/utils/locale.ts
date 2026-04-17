export const mapLocale = (locale: string): string => {
  switch (locale) {
    case "id":
      return "id-ID";
    case "en":
      return "en-US";
    default:
      return "id-ID";
  }
};
