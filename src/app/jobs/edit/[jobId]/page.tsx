import JobForm from "@/app/components/JobForm";
import NoAccess from "@/app/components/NoAccess";
import { JobModel } from "@/models/Job";
import { getUser } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import mongoose from "mongoose";

type PageProps = {
  params: {
    jobId: string;
  }
}

export default async function EditJobPage(pageProps: PageProps) {
  const jobId = pageProps.params.jobId;
  await mongoose.connect(process.env.MONGO_URI as string);
  const jobDoc = JSON.parse(JSON.stringify(await JobModel.findById(jobId)));
  if (!jobDoc) {
    <NoAccess text="Not found" />
  }
  const {user} = await getUser();
  const workos = new WorkOS(process.env.WORKOS_API_KEY as string);
  if (!user) {
    <NoAccess text="You need to login" />
  }
  const oms = await workos.userManagement.listOrganizationMemberships({
    userId: user?.id,
    organizationId: jobDoc.orgId,
  })
  if (oms.data.length === 0) {
    <NoAccess text="Access denied" />
  }
  return (
    <div>
      <JobForm orgId={jobDoc.orgId} jobDoc={jobDoc} />
    </div>
  )
}