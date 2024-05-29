import EmployeeFormatter from "@/core/formatters/employee.formatter";
import { EmployeeModel } from "@/domain/models/employee.model";
import { ReactNode } from "react";

export interface EmployeeCardProps {
  employee: EmployeeModel;
}

const EmployeeCard = ({ employee }: EmployeeCardProps): ReactNode => {
  return (
    <div className="w-full shadow bg-[#FEAE6F] p-4 flex gap-2 min-w-80 rounded-md font-sans">
      <span>{employee.id}</span>
      <span>{employee.employee_name}</span>
      <span>{EmployeeFormatter.formatSalary(employee.employee_salary)}</span>
    </div>
  );
};
export default EmployeeCard;
