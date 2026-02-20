import { resultData } from "../data";

export default function ProfessorPage() {
  const subjectStats: any[] = [];

  for (let i = 0; i < resultData.subjects.length; i++) {
    const subject = resultData.subjects[i];
    let total = 0;
    let passed = 0;

    for (let j = 0; j < resultData.students.length; j++) {
      const student = resultData.students[j];
      const marksForStudent: any = student.marks;
      const mark = marksForStudent[subject];
      total += mark;
      if (mark >= 50) {
        passed = passed + 1;
      }
    }

    const count = resultData.students.length || 1;
    const average = total / count;
    const passPercentage = (passed * 100) / count;

    subjectStats.push({
      subject: subject,
      average: average,
      passPercentage: passPercentage,
    });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8">
        <header className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold font-elephant">Professor view</h1>
          <p className="text-sm">
            {resultData.className} · {resultData.semester}
          </p>
        </header>

        <section className="rounded-lg border border-[#0077B6] bg-[#90E0EF] p-4">
          <h2 className="mb-3 text-sm font-semibold">
            Subject-wise summary
          </h2>
          <div className="overflow-x-auto text-xs">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-[#CAF0F8] text-left">
                  <th className="border-b border-[#90E0EF] px-2 py-2">
                    Subject
                  </th>
                  <th className="border-b border-[#90E0EF] px-2 py-2">
                    Average
                  </th>
                  <th className="border-b border-[#90E0EF] px-2 py-2">
                    Pass %
                  </th>
                </tr>
              </thead>
              <tbody>
                {subjectStats.map((stat) => (
                  <tr
                    key={stat.subject}
                    className="odd:bg-[#DBF5FA] even:bg-white"
                  >
                    <td className="border-b border-[#90E0EF] px-2 py-1">
                      {stat.subject}
                    </td>
                    <td className="border-b border-[#90E0EF] px-2 py-1">
                      {stat.average}
                    </td>
                    <td className="border-b border-[#90E0EF] px-2 py-1">
                      {stat.passPercentage}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-lg border border-[#0077B6] bg-[#90E0EF] p-4">
          <h2 className="mb-3 text-sm font-semibold">
            Detailed marks table
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-xs">
              <thead>
                <tr className="bg-[#CAF0F8] text-left">
                  <th className="border-b border-[#90E0EF] px-2 py-2">
                    Roll
                  </th>
                  <th className="border-b border-[#90E0EF] px-2 py-2">
                    Name
                  </th>
                  {resultData.subjects.map((subject) => (
                    <th
                      key={subject}
                      className="border-b border-[#90E0EF] px-2 py-2"
                    >
                      {subject}
                    </th>
                  ))}
                  <th className="border-b border-[#90E0EF] px-2 py-2">
                    Avg
                  </th>
                </tr>
              </thead>
              <tbody>
                {resultData.students.map((student) => {
                  let studentTotal = 0;
                  for (let i = 0; i < resultData.subjects.length; i++) {
                    const subject = resultData.subjects[i];
                    const marksForStudent: any = student.marks;
                    const mark = marksForStudent[subject] || 0;
                    studentTotal += mark;
                  }
                  const avg = studentTotal / resultData.subjects.length;

                  return (
                    <tr key={student.id} className="odd:bg-[#DBF5FA] even:bg-white">
                      <td className="border-b border-[#90E0EF] px-2 py-1">
                        {student.id}
                      </td>
                      <td className="border-b border-[#90E0EF] px-2 py-1">
                        {student.name}
                      </td>
                      {resultData.subjects.map((subject) => {
                        const marksForStudent: any = student.marks;
                        const mark = marksForStudent[subject] ?? 0;
                        const isFail = mark < 50;
                        return (
                          <td
                            key={subject}
                            className={`border-b border-[#90E0EF] px-2 py-1 ${
                              isFail
                                ? "text-rose-600"
                                : "text-zinc-800"
                            }`}
                          >
                            {mark}
                          </td>
                        );
                      })}
                      <td className="border-b border-[#90E0EF] px-2 py-1 font-medium">
                        {avg}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

