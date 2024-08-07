"use client";
import {
  faEnvelope,
  faPhone,
  faStar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextField, TextArea, RadioGroup, Button } from "@radix-ui/themes";
import { useState } from "react";

import {
  CitySelect,
  CountrySelect,
  StateSelect,
  //@ts-ignore
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import ImageUpload from "./ImageUpload";
import { saveJobAction } from "../actions/jobActions";
import { redirect } from "next/navigation";
import type { Job } from "@/models/Job";

export default function JobForm({ orgId, jobDoc }: { orgId: string; jobDoc?:Job }) {
  const [countryId, setCountryId] = useState(jobDoc?.countryId || 0);
  const [stateId, setStateId] = useState(jobDoc?.stateId || 0);
  const [cityId, setCityId] = useState(jobDoc?.cityId || 0);

  const [counryName, setCounryName] = useState(jobDoc?.country || "");
  const [stateName, setStateName] = useState(jobDoc?.state || "");
  const [cityName, setCityName] = useState(jobDoc?.city || "");

  async function handleSave(data: FormData) {
    data.set("country", counryName);
    data.set("state", stateName);
    data.set("city", cityName);
    data.set("orgId", orgId);
    data.set("countryId", countryId.toString());
    data.set("stateId", stateId.toString());
    data.set("cityId", cityId.toString());
    const jobDoc = await saveJobAction(data);
    redirect(`/jobs/${jobDoc.orgId}`);
  }
  

  return (
    <form action={handleSave} className="container mt-6 flex flex-col gap-4">
      {jobDoc && (
        <input type="hidden" name="id" value={jobDoc?._id} />
      )}
      <TextField.Root name="title" placeholder="Job Title" defaultValue={jobDoc?.title || ''} />
      <div className="sm:flex">
        <div className="w-1/3">
          <h3>Job icon</h3>
          <ImageUpload name="jobIcon" icon={faStar} defaultValue={jobDoc?.jobIcon || ''} />
        </div>
        <div className="grow">
          <h3>Contact person</h3>
          <div className="flex gap-2">
            <div>
              <ImageUpload name="contactPhoto" icon={faUser} defaultValue={jobDoc?.contactPhoto || ''} />
            </div>
            <div className="grow flex flex-col gap-1">
              <TextField.Root
                placeholder="John Doe"
                type="text"
                name="contactName"
                defaultValue={jobDoc?.contactName || ''}
              >
                <TextField.Slot>
                  <FontAwesomeIcon icon={faUser} />
                </TextField.Slot>
              </TextField.Root>
              <TextField.Root
                placeholder="Phone"
                type="tel"
                name="contactPhone"
                defaultValue={jobDoc?.contactPhone || ''}
              >
                <TextField.Slot>
                  <FontAwesomeIcon icon={faPhone} />
                </TextField.Slot>
              </TextField.Root>
              <TextField.Root
                placeholder="Email"
                type="email"
                name="contactEmail"
                defaultValue={jobDoc?.contactEmail || ''}
              >
                <TextField.Slot>
                  <FontAwesomeIcon icon={faEnvelope} />
                </TextField.Slot>
              </TextField.Root>
            </div>
          </div>
        </div>
      </div>
      <div className="grid sm:grid-cols-3 gap-6 *:grow">
        <div>
          Remote?
          <RadioGroup.Root defaultValue={jobDoc?.remote || 'onsite'} name="remote">
            <RadioGroup.Item value="onsite">On-site</RadioGroup.Item>
            <RadioGroup.Item value="hybrid">Hybrid-remote</RadioGroup.Item>
            <RadioGroup.Item value="remote">Fully remote</RadioGroup.Item>
          </RadioGroup.Root>
        </div>
        <div>
          Full Time?
          <RadioGroup.Root defaultValue={jobDoc?.type || "full"} name="type">
            <RadioGroup.Item value="project">Project</RadioGroup.Item>
            <RadioGroup.Item value="part">Part-time</RadioGroup.Item>
            <RadioGroup.Item value="full">Full-time</RadioGroup.Item>
          </RadioGroup.Root>
        </div>
        <div>
          Salary
          <TextField.Root name="salary" defaultValue={jobDoc?.salary || ''}>
            <TextField.Slot>$</TextField.Slot>
            <TextField.Slot>k/year</TextField.Slot>
          </TextField.Root>
        </div>
      </div>
      <div>
        Location
        <div className="flex flex-col sm:flex-row gap-4">
          <CountrySelect
          defaultValue={countryId ? {id: countryId, name: counryName} : ''}
            onChange={(e: any) => {
              setCountryId(e.id);
              setCounryName(e.name);
            }}
            placeHolder="Select Country"
          />
          <StateSelect
          defaultValue={stateId ? {id: stateId, name: stateName} : ''}
            countryid={countryId}
            onChange={(e: any) => {
              setStateId(e.id);
              setStateName(e.name);
            }}
            placeHolder="Select State"
          />
          <CitySelect
          defaultValue={cityId ? {id: cityId, name: cityName} : ''}
            countryid={countryId}
            stateid={stateId}
            onChange={(e: any) => {
              setCityId(e.id)
              setCityName(e.name);
            }}
            placeHolder="Select City"
          />
        </div>
      </div>
      <TextArea
        placeholder="Job description"
        resize="vertical"
        name="description"
        defaultValue={jobDoc?.description || ''}
      />
      <div className="flex items-center justify-center">
        <Button size="3">
          <span className="px-8">Save</span>
        </Button>
      </div>
    </form>
  );
}
