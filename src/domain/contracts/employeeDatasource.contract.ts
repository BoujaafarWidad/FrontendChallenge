import { EmployeeListModel, EmployeeModel } from "../models/employee.model";
import {
  GetEmployeeByIdParams, UpdateEmployeeParams
} from "../params/employee.param";

export default abstract class EmployeeDatasourceContract {
  public abstract getEmployeeList(): Promise<EmployeeListModel | undefined>;
  public abstract createEmployee(
    params: unknown,
  ): Promise<EmployeeModel | undefined>;
  public abstract getEmployeeById(
    params: GetEmployeeByIdParams,
  ): Promise<EmployeeModel | undefined>;
  public abstract updateEmployeeById(
    params: GetEmployeeByIdParams, data: UpdateEmployeeParams
  ): Promise<EmployeeModel | undefined>;
  public abstract deleteEmployeeById(
    params: GetEmployeeByIdParams,
  ): Promise<EmployeeModel | undefined>;
}
