"use client";

import { useEffect, useState } from "react";
import { Button } from "./button";
import { Trash, ImagePlus } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
type ImageUploadProps = {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
};
const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
  disabled,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };
  if (!isMounted) return null;

  return (
    <div>
      <div className="flex items-center gap-4">
        {value.map((url, index) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden "
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image src={url} fill className="object-cover" alt={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="mh0gkjbl">
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              type="button"
              disabled={disabled}
              onClick={onClick}
              variant="secondary"
            >
              <ImagePlus className="h-4 w-4 mr-2"/>
              Upload an image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
