"use client";
import { IconDefinition, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@radix-ui/themes";
import { ChangeEvent, useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function ImageUpload({ name, icon, defaultValue='' }: { name: string; icon: IconDefinition; defaultValue: string }) {
  const fileInRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState(defaultValue);
  const [isUploading, setIsUploading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);

  async function upload(ev: ChangeEvent) {
    const input = ev.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      setIsUploading(true);
      const file = input.files[0];
      const data = new FormData();
      data.set("file", file);
      const response = await axios.post("/api/upload", data);
      if (response.data.url) {
        setUrl(response.data.url);
        setIsUploading(false)
        setIsImageLoading(true);
      }
    }
  }
  return (
    <>
      <div className="bg-gray-200 rounded-md size-24 inline-flex items-center content-center justify-center overflow-hidden">
        {(isUploading || isImageLoading) && (
          <FontAwesomeIcon
            icon={faSpinner}
            className="text-gray-400 animate-spin"
          />
        )}
        {!isUploading && url && (
          <Image
            src={url}
            alt="job_icon"
            width={1024}
            height={1024}
            onLoadingComplete={() => setIsImageLoading(false)}
            className="object-cover"
          />
        )}
        {!(isUploading || isImageLoading) && !url && (
          <FontAwesomeIcon icon={icon} className="text-gray-400" />
        )}
      </div>
      <input type="hidden" name={name} value={url} />
      <div className="mt-2">
        <input
          type="file"
          ref={fileInRef}
          className="hidden"
          onChange={upload}
        />
        <Button
          variant="soft"
          type="button"
          onClick={() => fileInRef.current?.click()}
        >
          Select File
        </Button>
      </div>
    </>
  );
}
