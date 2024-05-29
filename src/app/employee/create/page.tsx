"use client";
import { useCreateEmployee } from "@/domain/hooks/useCreateEmployee.hook";
import { CreateEmployeeParams } from "@/domain/params/employee.param";
import Loading from "@/ui/components/Loading";
import { useState } from "react";

export default function EditEmployeePage() {
  // TODO Implement create employee page
  const [employeeData, setEmployeeData] = useState<CreateEmployeeParams>({ name: '', age: undefined, salary: undefined });
  const [errors, setErrors] = useState<any>({});
  const { name, salary, age } = employeeData
  const mutation = useCreateEmployee();

  const validateData = () => {
    let errors: any = {};
    if (!name) {
      errors.name = "Name is required";
    }
    if (!age) {
      errors.age = "Age is required";
    }
    if (!salary) {
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
    mutation.mutate(employeeData);
  }

  return (
    <main className="flex h-screen flex-col justify-items-center p-4">
      Create Employee
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-xs">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Name
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="name" type="text"
                placeholder="Name"
                value={name}
                onChange={handleChange}
                required
              />
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.name}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Salary
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="salary" type="number"
                placeholder="Salary" onChange={handleChange} value={salary} required />
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.age}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Age
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="age" type="number"
                placeholder="Age" onChange={handleChange} value={age} required />
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.salary}</p>
            </div>
            <div className="flex items-center justify-center mt-7">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={OnSubmitClick}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
      {mutation.isPending && (
        <div className="flex-1 w-full items-center justify-center">
          <Loading />
        </div>
      )}
      {!mutation.isPending && mutation.isError && (
        <div className="flex-1 w-full items-center justify-center">
          <span>error</span>
        </div>
      )}
      {mutation.isSuccess && (
        <div className="flex-1 w-full items-center justify-center">
          <span>Employee successfully added</span>
        </div>
      )}
    </main>
  );
}
