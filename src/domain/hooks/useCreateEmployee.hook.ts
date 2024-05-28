import { useMutation } from "@tanstack/react-query";
import { CreateEmployeeParams } from "../params/employee.param";
import EmployeeService from "../services/employee.service";

const service = EmployeeService.getInstance();

export const useCreateEmployee = () => {
  const mutation = useMutation({
    mutationFn: (employeeData: CreateEmployeeParams) => service.createEmployee(employeeData),
  });
  return mutation;
};