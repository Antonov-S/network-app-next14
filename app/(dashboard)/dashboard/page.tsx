import { BarChart } from "@mantine/charts";

import { getCountOfJobTitles } from "@/lib/utils/get-count-of-job-titles";
import { getCountOfSkills } from "@/lib/utils/getCountOfSkills";

export default async function Page() {
  const data = await getCountOfJobTitles();
  const data2 = await getCountOfSkills();
  return (
    <div className="flex flex-col gap-5">
      {/* <h1>Dashboard</h1> */}
      <h2 className="font-bold text-xl">Job Titles</h2>
      <BarChart
        h={300}
        data={data}
        dataKey="jobTitle"
        type="stacked"
        orientation="vertical"
        yAxisProps={{ width: 80 }}
        series={[{ name: "count", color: "blue.6" }]}
      />
      <h2 className="font-bold text-xl">Skills</h2>
      <BarChart
        h={300}
        data={data2}
        dataKey="name"
        type="stacked"
        orientation="vertical"
        yAxisProps={{ width: 80 }}
        series={[{ name: "count", color: "orange.6" }]}
      />
    </div>
  );
}
