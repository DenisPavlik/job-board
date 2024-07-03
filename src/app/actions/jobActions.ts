"use server";

import { Job, JobModel } from "@/models/Job";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import {
  AutoPaginatable,
  OrganizationMembership,
  User,
  WorkOS,
} from "@workos-inc/node";

export async function saveJobAction(formData: FormData) {
  await mongoose.connect(process.env.MONGO_URI as string);
  const { id, ...jobData } = Object.fromEntries(formData);

  const jobDoc = id
    ? await JobModel.findByIdAndUpdate(id, jobData)
    : await JobModel.create(jobData);

  if ("orgId" in jobData) {
    revalidatePath("/jobs/" + jobData.orgId);
  }
  return JSON.parse(JSON.stringify(jobDoc));
}

// export async function getJobs(orgId: string | null) {
//   await mongoose.connect(process.env.MONGO_URI as string);
//   let jobsDoc = []
//   if (orgId === null) {
//     jobsDoc =  await JobModel.find();
//   } else {
//     jobsDoc = await JobModel.find({ orgId: orgId });
//   }
//   return JSON.parse(JSON.stringify(jobsDoc));
// }

export async function addOrgAndUserData(jobsDocs: Job[], user: User | null) {
  jobsDocs = JSON.parse(JSON.stringify(jobsDocs))
  const workos = new WorkOS(process.env.WORKOS_API_KEY as string);
  await mongoose.connect(process.env.MONGO_URI as string);
  let oms: AutoPaginatable<OrganizationMembership> | null = null;
  if (user) {
    oms = await workos.userManagement.listOrganizationMemberships({
      userId: user.id,
    });
  }
  for (const job of jobsDocs) {
    const org = await workos.organizations.getOrganization(job.orgId);
    job.orgName = org.name;
    if (oms && oms.data.length > 0) {
      job.isAdmin = !!oms.data.find(om => om.organizationId === job.orgId)
    }
  }
  return jobsDocs;
}
