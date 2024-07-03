"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import type { Job } from "@/models/Job";
import TimeAgo from "./TimeAgo";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";

export default function JobRow({ jobDoc }: { jobDoc: Job }) {
  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-sm relative">
        <div className="absolute top-4 right-4 cursor-pointer">
          <FontAwesomeIcon className="size-4 text-gray-300" icon={faHeart} />
        </div>
        <div className="flex gap-4">
          <div className="content-center">
            <Image src={jobDoc.jobIcon} alt="jobIcon" width={500} height={500} className="size-14 object-cover" />
          </div>
          <div className="grow sm:flex">
            <div className="grow">
              <div>
                <Link href={`/jobs/${jobDoc.orgId}`} className="text-gray-500 text-sm hover:underline">
                  {jobDoc.orgName || "?"}
                </Link>
              </div>
              <div className="font-bold mb-1 text-lg">
                <Link href={`/show/${jobDoc._id}`} className="hover:underline">{jobDoc.title}</Link>
              </div>
              <div className="text-gray-400 text-sm capitalize">
                {jobDoc.remote} &middot; {jobDoc.city}, {jobDoc.country}{" "}
                &middot; {jobDoc.type}-time
                {jobDoc.isAdmin && (
                  <>
                    {" "}
                    &middot; <Link href={"/jobs/edit/" + jobDoc._id}>
                      Edit
                    </Link>{" "}
                    &middot;{" "}
                    <button
                      type="button"
                      onClick={async () => {
                        await axios.delete("/api/jobs?id=" + jobDoc._id);
                        window.location.reload();
                      }}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
            {jobDoc.createdAt && (
              <div className="content-end text-gray-500 text-sm">
                <TimeAgo createdAt={jobDoc.createdAt} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
