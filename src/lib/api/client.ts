import axios from "axios";

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
    "x-timezone": timezone,
  },
});
