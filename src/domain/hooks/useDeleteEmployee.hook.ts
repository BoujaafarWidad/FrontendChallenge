import { useQuery } from "@tanstack/react-query";
import { GetEmployeeByIdParams } from "../params/employee.param";
import EmployeeService from "../services/employee.service";

const service = EmployeeService.getInstance();

export const useDeleteEmployeeById = (employeeId: GetEmployeeByIdParams) => {
  return useQuery({
    queryKey: ["deleteEmployeeById", employeeId],
    queryFn: () => service.deleteEmployeeById(employeeId),
    enabled: false
  });
};