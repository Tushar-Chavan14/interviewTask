import { Request, Response, NextFunction, RequestHandler } from "express";
import yup from "yup";

export const catchAsync = <T>(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<T>
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): any => {
    fn(req, res, next).catch(next);
  };
};

export const catchError = async <T>(
  promise: Promise<T>
): Promise<[undefined, T] | [Error]> =>
  promise
    .then((data) => [undefined, data] as [undefined, T])
    .catch((error) => [error]);

type ValidationResult<T> = {
  success: boolean;
  data?: T;
  errors?: Record<string, string>;
};

export async function validateSchema<T>(
  schema: yup.Schema<T>,
  data: unknown
): Promise<ValidationResult<T>> {
  try {
    const validatedData = await schema.validate(data, { abortEarly: false });
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors: Record<string, string> = {};
      error.inner.forEach((err) => {
        if (err.path) {
          errors[err.path] = err.message;
        }
      });
      return { success: false, errors };
    }
    return { success: false, errors: { general: "Validation failed" } };
  }
}
