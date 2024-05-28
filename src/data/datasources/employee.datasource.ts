import EmployeeDatasourceContract from "@/domain/contracts/employeeDatasource.contract";
import {
  EmployeeListModel,
  EmployeeListSchema,
  EmployeeModel
} from "@/domain/models/employee.model";
import { CreateEmployeeParams, DeleteEmployeeByIdParams, GetEmployeeByIdParams, UpdateEmployeeParams } from "@/domain/params/employee.param";

export default class EmployeeDatasource extends EmployeeDatasourceContract {
  public async getEmployeeList(): Promise<EmployeeListModel | undefined> {
    try {
      const response = await fetch(
        "https://dummy.restapiexample.com/api/v1/employees",
      );

      // Validate response
      if (response.status !== 200) {
        return undefined;
      }

      // Obtain json from response
      const json = await response.json();
      // Extract data
      const data = json["data"];

      return EmployeeListSchema.parse(data);
    } catch (exception) {
      return undefined;
    }
  }

  public async createEmployee(
    params: CreateEmployeeParams,
  ): Promise<EmployeeModel | undefined> {
    try {
      const response = await fetch(
        "https://dummy.restapiexample.com/api/v1/create",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(params),
          cache: "no-cache"
        }
      );

      // Validate response
      if (response.status !== 200) {
        return undefined;
      }
      // Obtain json from response
      const json = await response.json();
      // Extract data
      const data = json["data"];
      return { id: data.id, employee_name: data.name, employee_salary: data.salary, employee_age: data.age };
    } catch (exception) {
      return undefined;
    }
  }

  public async getEmployeeById(
    params: GetEmployeeByIdParams,
  ): Promise<EmployeeModel | undefined> {
    try {
      const response = await fetch(
        `https://dummy.restapiexample.com/api/v1/employee/${params.id}`,
      );

      // Validate response
      if (response.status !== 200) {
        return undefined;
      }

      // Obtain json from response
      const json = await response.json();
      // Extract data
      const data = json["data"];

      return data;
      // setTimeout(() => {

      // }, 3000);
      // return { id: 1, employee_name: "widad", employee_salary: 20000, employee_age: 27 }

    } catch (exception) {
      return undefined;
    }
  }

  public async updateEmployeeById(
    params: GetEmployeeByIdParams, data: UpdateEmployeeParams
  ): Promise<EmployeeModel | undefined> {
    try {
      const response = await fetch(
        `https://dummy.restapiexample.com/api/v1/update/${params.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
          cache: "no-cache"
        }
      );

      // Validate response
      if (response.status !== 200) {
        return undefined;
      }
      // Obtain json from response
      const json = await response.json();
      // Extract data
      const returnedData = json["data"];
      return { id: data.id, employee_name: data.name, employee_salary: data.salary, employee_age: data.age };
    } catch (exception) {
      return undefined;
    }
  }

  public async deleteEmployeeById(
    params: DeleteEmployeeByIdParams,
  ): Promise<EmployeeModel | undefined> {
    try {
      const response = await fetch(
        `https://dummy.restapiexample.com/api/v1/delete/${params.id}`,
      );

      // Validate response
      if (response.status !== 200) {
        return undefined;
      }

      // Obtain json from response
      const json = await response.json();
      // Extract message
      const message = json["message"];

      return message;
    } catch (exception) {
      return undefined;
    }
  }
}
