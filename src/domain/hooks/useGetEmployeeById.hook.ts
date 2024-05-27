import { useQuery } from "@tanstack/react-query";
import { GetEmployeeByIdParams } from "../params/employee.param";
import EmployeeService from "../services/employee.service";

const service = EmployeeService.getInstance();

export const useGetEmployeeById = (employeeId: GetEmployeeByIdParams) => {
  return useQuery({
    queryKey: ["getEmployeeById", employeeId],
    queryFn: () => service.getEmployeeById(employeeId),
  });
};