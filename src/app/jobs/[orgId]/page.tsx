import mongoose from "mongoose";
import Jobs from "@/app/components/Jobs";
import {
  AutoPaginatable,
  OrganizationMembership,
  WorkOS,
} from "@workos-inc/node";
import { JobModel } from "@/models/Job";
import { getUser } from "@workos-inc/authkit-nextjs";
import { addOrgAndUserData } from "@/app/actions/jobActions";

type PageProps = {
  params: {
    orgId: string;
  };
};

export default async function CompanyJobsPage(props: PageProps) {
  const { user } = await getUser();
  const workos = new WorkOS(process.env.WORKOS_API_KEY as string);
  const org = await workos.organizations.getOrganization(props.params.orgId);
  // const jobsDoc = await getJobs(org.id);
  let jobsDocs = JSON.parse(
    JSON.stringify(await JobModel.find({ orgId: org.id }))
  );
  jobsDocs = await addOrgAndUserData(jobsDocs, user);

  return (
    <div>
      <div className="container">
        <h1 className="text-xl mb-6">{org.name} Jobs</h1>
        <Jobs jobs={jobsDocs} header={"Jobs posted by " + org.name} />
      </div>
    </div>
  );
}
