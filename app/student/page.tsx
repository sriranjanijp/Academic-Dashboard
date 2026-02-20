"use client";

import { useState } from "react";
import { resultData } from "../data";

export default function StudentPage() {
  const [studentState, setStudentState] = useState({
    studentName: "",
    searchName: "",
  });

  const studentName = studentState.studentName;
  const searchName = studentState.searchName;

  // find student by name (only after Enter is pressed)
  let foundStudent = null;
  for (let i = 0; i < resultData.students.length; i++) {
    if (resultData.students[i].name.toLowerCase() === searchName.toLowerCase()) {
      foundStudent = resultData.students[i];
      break;
    }
  }

  // calculate student average if found
  let studentAverage = 0;
  if (foundStudent) {
    let total = 0;
    const marksForStudent: any = foundStudent.marks;
    for (let i = 0; i < resultData.subjects.length; i++) {
      const subject = resultData.subjects[i];
      const mark = marksForStudent[subject] || 0;
      total += mark;
    }
    studentAverage = total / resultData.subjects.length;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-8">
        <header className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold font-elephant">Student view</h1>
          <p className="text-sm">
            {resultData.className} · {resultData.semester}
          </p>
          <p className="text-xs">
            Enter your name to view your individual performance.
          </p>
        </header>

        <section className="rounded-lg border border-[#0077B6] bg-[#90E0EF] p-4">
          <div className="mb-3">
            <label className="block text-sm font-semibold mb-2">
              Enter student name:
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) =>
                setStudentState({
                  ...studentState,
                  studentName: e.target.value,
                })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setStudentState({
                    ...studentState,
                    searchName: studentName,
                  });
                }
              }}
              placeholder="e.g., Alex, Bhavya, Chris... (Press Enter)"
              className="w-full rounded-md border border-[#0077B6] px-3 py-2 text-sm"
            />
          </div>

          {foundStudent ? (
            <div className="mt-4">
              <h2 className="text-sm font-semibold mb-3">
                {foundStudent.name} ({foundStudent.id}) - Performance Details
              </h2>
              <div className="mb-4 p-3 bg-white rounded-md">
                <p className="text-xs">
                  Overall Average: <span className="font-semibold text-zinc-900">{studentAverage}</span> / 100
                </p>
              </div>
              <div className="overflow-x-auto text-xs">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-[#CAF0F8] text-left">
                      <th className="border-b border-[#90E0EF] px-2 py-2">
                        Subject
                      </th>
                      <th className="border-b border-[#90E0EF] px-2 py-2">
                        Marks
                      </th>
                      <th className="border-b border-[#90E0EF] px-2 py-2">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultData.subjects.map((subject) => {
                      const marksForStudent: any = foundStudent.marks;
                      const mark = marksForStudent[subject] || 0;
                      const isPass = mark >= 50;
                      return (
                        <tr
                          key={subject}
                          className="odd:bg-[#DBF5FA] even:bg-white"
                        >
                          <td className="border-b border-[#90E0EF] px-2 py-1">
                            {subject}
                          </td>
                          <td className={`border-b border-[#90E0EF] px-2 py-1 text-zinc-800`}>
                            {mark}
                          </td>
                          <td className="border-b border-[#90E0EF] px-2 py-1">
                            {isPass ? "Pass" : "Fail"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : searchName ? (
            <p className="mt-4 text-sm">
              Student "{searchName}" not found. Please check the spelling.
            </p>
          ) : null}
        </section>
      </main>
    </div>
  );
}

