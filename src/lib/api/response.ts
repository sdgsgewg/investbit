import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { HttpError } from "../errors/http-error";

export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status },
  );
}

export function noContentResponse() {
  return new Response(null, {
    status: 204,
  });
}

export function createdResponse<T>(data: T) {
  return successResponse(data, 201);
}

export function errorResponse(error: unknown) {
  if (error instanceof HttpError) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: error.status,
      },
    );
  }

  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        success: false,
        error: error.issues.map((i) => i.message).join(", "),
      },
      {
        status: 400,
      },
    );
  }

  return NextResponse.json(
    {
      success: false,
      error: error instanceof Error ? error.message : "Internal Server Error",
    },
    {
      status: 500,
    },
  );
}
