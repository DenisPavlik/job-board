import JobRow from "./JobRow";

export default function Jobs() {
  return (
    <section className="bg-slate-200 py-6 rounded-3xl">
      <div className="container">
        <h2 className="font-bold mb-4">Recent jobs</h2>

        <div className="flex flex-col gap-2">
          <JobRow />
          <JobRow />
          <JobRow />
          <JobRow />
          <JobRow />
        </div>
      </div>
    </section>
  );
}
