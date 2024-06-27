import NoAccess from "@/app/components/NoAccess";
import { getUser } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";

type PageProps = {
  params: {
    orgId: string;
  };
};

export default async function NewListingForOrgPage(props: PageProps) {
  const { user } = await getUser();
  if (!user) {
    return <NoAccess text="You need to be logged in to post a job!" />;
  }
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  const orgId = props.params.orgId;
  const oms = await workos.userManagement.listOrganizationMemberships({
    userId: user.id,
    organizationId: orgId,
  });
  const hasAccess = oms.data.length > 0;
  if (!hasAccess) {
    return <NoAccess text="You have no access." />
  }

  return (
    <form action="" className="container mt-6">
      <input type="text" name="job_title" id="job_title" placeholder="Job title" className="border p-2" />
    </form>
  );
}
