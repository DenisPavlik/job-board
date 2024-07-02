import mongoose from "mongoose";
import Jobs from "@/app/components/Jobs";
import { WorkOS } from "@workos-inc/node";
import { JobModel } from "@/models/Job";

type PageProps = {
  params: {
    orgId: string;
  };
};

export default async function CompanyJobsPage(props: PageProps) {
  const workos = new WorkOS(process.env.WORKOS_API_KEY as string);
  const org = await workos.organizations.getOrganization(props.params.orgId);
  // const jobsDoc = await getJobs(org.id);
  await mongoose.connect(process.env.MONGO_URI as string);
  const jobsDoc = JSON.parse(JSON.stringify(await JobModel.find({orgId: org.id})))
  for (const job of jobsDoc) {
    const org = await workos.organizations.getOrganization(job.orgId);
    job.orgName = org.name;
  }



  return (
    <div>
      <div className="container">
        <h1 className="text-xl mb-6">{org.name} Jobs</h1>
        <Jobs jobs={jobsDoc} header={'Jobs posted by '+ org.name} />
      </div>
    </div>
  );
}
