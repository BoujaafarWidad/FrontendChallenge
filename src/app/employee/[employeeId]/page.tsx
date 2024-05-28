"use client";

import { useDeleteEmployeeById } from "@/domain/hooks/useDeleteEmployee.hook";
import { useGetEmployeeById } from "@/domain/hooks/useGetEmployeeById.hook";
import EmployeeCard from "@/ui/components/EmployeeCard.component";
import Link from "next/link";
import { useParams } from 'next/navigation';

export default function EditEmployeePage() {
  // TODO Implement employee details page and delete feature
  const params = useParams();
  const { data, isLoading, isError } = useGetEmployeeById({ id: +params.employeeId });
  const { data: deleteMessage, isLoading: isLoadingDelete, isError: isErrorDelete, refetch } = useDeleteEmployeeById({ id: +params.employeeId });

  // const employee: EmployeeModel = {
  //   id: 2,
  //   employee_name: "Mock Employee",
  //   employee_salary: 10_000_000,
  // };

 // console.log(deleteMessage, "deleeted")

  return (
    <main className="flex h-screen flex-col items-start justify-start p-4 gap-4">
      <h1>Employee Details</h1>
      {data && <EmployeeCard employee={data} />}
      <div className="flex gap-4">
        <Link
          className="border px-2 py-1 rounded-md"
          href={`/employee/${+params.employeeId}/edit`}
        >
          Edit
        </Link>

        <button
          className="border px-2 py-1 rounded-md bg-[#b8271c] text-white"
          onClick={() => refetch()}
        >
          Delete
        </button>
      </div>

      {isLoading && isLoadingDelete && (
        <div className="flex-1 w-full items-center justify-center">
          <span>loading</span>
        </div>
      )}
      {!data && !isLoading && isError && isErrorDelete && (
        <div className="flex-1 w-full items-center justify-center">
          <span>error</span>
        </div>
      )}
    </main>
  );
}
