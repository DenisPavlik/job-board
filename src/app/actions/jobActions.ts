"use server";

import { JobModel } from "@/models/Job";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export async function saveJobAction(data: FormData) {
  await mongoose.connect(process.env.MONGO_URI as string);
  const jobDoc = await JobModel.create(Object.fromEntries(data));
  if ("orgId" in data) {
    revalidatePath("/jobs/" + data.orgId);
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
