import { resultData } from "../data";

export default function HODPage() {
  // simple overall average
  let totalOfAverages = 0;
  for (let i = 0; i < resultData.students.length; i++) {
    const student = resultData.students[i];
    let studentTotal = 0;
    for (let j = 0; j < resultData.subjects.length; j++) {
      const subject = resultData.subjects[j];
      const marksForStudent: any = student.marks;
      const mark = marksForStudent[subject] || 0;
      studentTotal += mark;
    }
    const studentAverage = studentTotal / resultData.subjects.length;
    totalOfAverages += studentAverage;
  }
  const studentCount = resultData.students.length || 1;
  const overallAverage = totalOfAverages / studentCount;

  // simple subject stats
  const subjectStats: any[] = [];
  for (let i = 0; i < resultData.subjects.length; i++) {
    const subject = resultData.subjects[i];
    let total = 0;
    let passed = 0;

    for (let j = 0; j < resultData.students.length; j++) {
      const student = resultData.students[j];
      const marksForStudent: any = student.marks;
      const mark = marksForStudent[subject] || 0;
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

  // strongest and weakest just by walking the array once
  let strongestSubject = subjectStats[0];
  let weakestSubject = subjectStats[0];
  for (let i = 1; i < subjectStats.length; i++) {
    const current = subjectStats[i];
    if (current.average > strongestSubject.average) {
      strongestSubject = current;
    }
    if (current.average < weakestSubject.average) {
      weakestSubject = current;
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8">
        <header className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold font-elephant">HOD view</h1>
          <p className="text-sm">
            {resultData.className} · {resultData.semester}
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-[#0077B6] bg-[#90E0EF] p-4">
            <p className="text-xs font-medium uppercase">
              Overall average
            </p>
            <p className="mt-2 text-2xl font-semibold">
              {overallAverage}
              <span className="text-sm font-normal">
                {" "}
                / 100
              </span>
            </p>
          </div>

          <div className="rounded-lg border border-[#0077B6] bg-[#90E0EF] p-4">
            <p className="text-xs font-medium uppercase">
              Strongest subject
            </p>
            <p className="mt-1 text-sm font-medium">
              {strongestSubject.subject}
            </p>
            <p className="text-xs">
              Avg: {strongestSubject.average} · Pass:{" "}
              {strongestSubject.passPercentage}%
            </p>
          </div>

          <div className="rounded-lg border border-[#0077B6] bg-[#90E0EF] p-4">
            <p className="text-xs font-medium uppercase">
              Weakest subject
            </p>
            <p className="mt-1 text-sm font-medium">
              {weakestSubject.subject}
            </p>
            <p className="text-xs">
              Avg: {weakestSubject.average} · Pass:{" "}
              {weakestSubject.passPercentage}%
            </p>
          </div>
        </section>

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
      </main>
    </div>
  );
}

