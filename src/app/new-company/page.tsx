import { getUser } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import { createCompany } from "../actions/workosActions";

export default async function NewCompanyPage() {
  const {user} = await getUser();
  if (!user) {
    return (
      <div className="text-center my-20 text-xl">
        You need to be logged in to post a job!
      </div>
    );
  }
  
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  async function handleNewCompanyFormSubmit(data: FormData) {
    'use server';
    if (user) {
      await createCompany(data.get('newCompanyName') as string, user.id)
    }
  }
  return (
    <div className="container">
      <h2 className="text-lg mt-6">Create a new company</h2>
      <p className="text-gray-500 text-sm mb-2">
        To create a job listing you first need to register a company
      </p>
      <form
        action={handleNewCompanyFormSubmit}
        className="flex gap-2"
      >
        <input
          type="text"
          name="newCompanyName"
          className="p-2 border border-gray-400 rounded-md"
        />
        <button
          type="submit"
          className="flex gap-2 items-center bg-gray-200 p-2 rounded-md"
        >
          Create company
        </button>
      </form>
    </div>
  );
}
