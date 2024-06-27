'use server';

import { WorkOS } from "@workos-inc/node";
import { redirect } from "next/navigation";

const workos = new WorkOS(process.env.WORKOS_API_KEY);

export async function createCompany(companyName: string, userId: string) {
  const org = await workos.organizations.createOrganization({name: companyName})
  await workos.userManagement.createOrganizationMembership({
    userId,
    organizationId: org.id,
    roleSlug: 'admin'
  })
  redirect('/new-listing')
}