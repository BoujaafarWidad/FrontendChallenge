"use client";
import { useGetEmployeeById } from "@/domain/hooks/useGetEmployeeById.hook";
import { useUpdateEmployee } from "@/domain/hooks/useUpdateEmployee.hook";
import { CreateEmployeeParams } from "@/domain/params/employee.param";
import Loading from "@/ui/components/Loading";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditEmployeePage() {
  // TODO Implement edit / update employee page
  const params = useParams();
  const { data, isLoading, isError } = useGetEmployeeById({ id: +params.employeeId });
  const [employeeData, setEmployeeData] = useState<any>(data ?? {});
  const [errors, setErrors] = useState<any>({});
  const { employee_name, employee_salary, employee_age } = employeeData
  const mutation = useUpdateEmployee({ id: +params.employeeId });

  useEffect(() => {
    if (data) {
      setEmployeeData(data)
    }
  }, [data])

  const validateData = () => {
    let errors: any = {};
    if (!employee_name) {
      errors.name = "Name is required";
    }
    if (!employee_salary) {
      errors.age = "Age is required";
    }
    if (!employee_age) {
      errors.salary = "Salary is required";
    }
    return errors;
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployeeData((prevData: CreateEmployeeParams) => ({ ...prevData, [name]: value }))
  }
  const OnSubmitClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const errors: CreateEmployeeParams = validateData();
    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }
    setErrors({});
    console.log(employeeData);
    mutation.mutate({ name: employeeData.employee_name, age: employeeData.employee_age, salary: employeeData.employee_salary, id: +params.employeeId });
  }

  return (
    <main className="flex h-screen flex-col justify-items-center p-4">
      <h1 className="font-sans text-lg font-medium">Edit Employee</h1>
      {data &&
        <div className="flex justify-center mt-10">
          <div className="w-full max-w-xs">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Name
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="employee_name" type="text"
                  placeholder="Name"
                  value={employee_name}
                  onChange={handleChange}
                  required
                />
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.name}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Salary
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="employee_salary" type="number"
                  placeholder="Salary" onChange={handleChange} value={employee_salary} required
                />
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.age}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Age
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="employee_age" type="number"
                  placeholder="Age" onChange={handleChange} value={employee_age} required />
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.salary}</p>
              </div>
              <div className="flex items-center justify-center mt-7">
                <button
                  className="border px-4 py-1.5 rounded-md bg-[#01204E] text-white font-sans"
                  type="button"
                  onClick={OnSubmitClick}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      }
      {isLoading && mutation.isPending && (
        <div className="flex-1 w-full items-center justify-center">
          <Loading />
        </div>
      )}
      {isError && !isLoading && (
        <div className="flex-1 w-full items-center justify-center">
          <span>error</span>
        </div>
      )}
      {!isError && mutation.isSuccess && (
        <div className="flex-1 w-full items-center justify-center">
          <span>Employee successfully updated</span>
        </div>
      )}
    </main>
  );
}
