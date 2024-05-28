import { z } from "zod";
import { EmployeeIdSchema } from "../models/employee.model";

export const GetEmployeeByIdSchema = z.object({
  id: EmployeeIdSchema,
});
export type GetEmployeeByIdParams = z.infer<typeof GetEmployeeByIdSchema>;

export const UpdateEmployeeSchema = z.object({
  name: z.string().min(1),
  salary: z.number().positive(),
  age: z.number().positive(),
  id: EmployeeIdSchema,
});
export type UpdateEmployeeParams = z.infer<typeof UpdateEmployeeSchema>;

export const DeleteEmployeeByIdSchema = z.object({
  id: EmployeeIdSchema,
});
export type DeleteEmployeeByIdParams = z.infer<typeof DeleteEmployeeByIdSchema>;

export const CreateEmployeeSchema = z.object({
  name: z.string().min(1),
  salary: z.number().positive().optional(),
  age: z.number().positive().optional()
});

export type CreateEmployeeParams = z.infer<typeof CreateEmployeeSchema>;