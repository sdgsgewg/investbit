export function isFormDataRequest(request: Request) {
  return request.headers.get("content-type")?.includes("multipart/form-data");
}

export function isJsonRequest(request: Request) {
  return request.headers.get("content-type")?.includes("application/json");
}
