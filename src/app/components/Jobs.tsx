import type { Job } from "@/models/Job";
import JobRow from "./JobRow";

export default function Jobs({header, jobs}: {header: string, jobs: Job[]}) {
  return (
    <section className="bg-slate-200 py-6 rounded-3xl">
      <div className="container">
        <h2 className="font-bold mb-4">{header || 'Recent jobs'}</h2>

        <div className="flex flex-col gap-2">
          {!jobs?.length && (
            <div>No jobs found</div>
          )}
          
          {jobs && jobs.map((job, index)=>(
            <JobRow jobDoc={job} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
