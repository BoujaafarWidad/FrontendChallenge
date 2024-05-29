"use client";

import { useGetEmployeeList } from "@/domain/hooks/useGetEmployeeList.hook";
import EmployeeCard from "@/ui/components/EmployeeCard.component";
import Loading from "@/ui/components/Loading";
import Link from "next/link";

export default function Home() {
  const { data, isLoading, isError } = useGetEmployeeList();

  return (
    <main className="flex h-screen flex-col items-start justify-start p-4 gap-4">
      <div className="flex justify-between w-full mb-10">
        <h1 className="font-sans text-lg font-medium">Employee List {data && <span>({data.length})</span>}</h1>
        <Link className="border px-4 py-1.5 rounded-md bg-[#01204E] text-white font-sans" href={`/employee/create`}>
          Create
        </Link>
      </div>
      {data && (
        <ol className="flex flex-wrap gap-2">
          {data?.map((employee, index) => (
            <li key={index}>
              <Link href={`/employee/${employee.id}`}>
                <EmployeeCard employee={employee} />
              </Link>
            </li>
          ))}
        </ol>
      )}

      {isLoading && (
        <div className="flex-1 w-full items-center justify-center">
          <Loading />
        </div>
      )}
      {!data && !isLoading && isError && (
        <div className="flex-1 w-full items-center justify-center">
          <span>error</span>
        </div>
      )}
    </main>
  );
}
