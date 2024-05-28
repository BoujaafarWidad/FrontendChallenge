import { useMutation } from "@tanstack/react-query";
import { GetEmployeeByIdParams, UpdateEmployeeParams } from "../params/employee.param";
import EmployeeService from "../services/employee.service";

const service = EmployeeService.getInstance();

export const useUpdateEmployee = (employeeId: GetEmployeeByIdParams) => {
  const mutation = useMutation({
    mutationFn: (employeeData: UpdateEmployeeParams) => service.updateEmployeeById(employeeId, employeeData),
  });
  return mutation;
};