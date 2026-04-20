import axios from "axios";

export const isLikelyConnectionError = (error: unknown): boolean => {
  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    return true;
  }

  if (axios.isAxiosError(error)) {
    return (
      error.code === "ERR_NETWORK" ||
      error.code === "ECONNABORTED" ||
      !error.response ||
      /network|internet|connection|timeout/i.test(error.message)
    );
  }

  if (error instanceof TypeError) {
    return /failed to fetch|network/i.test(error.message);
  }

  if (error instanceof Error) {
    return /network|internet|connection|timeout|offline/i.test(error.message);
  }

  return false;
};
