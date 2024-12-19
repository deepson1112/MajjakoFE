import { Icons } from "@/components/Icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { getImageData } from "@/lib/utils";
import { UserProfileSetup } from "@/lib/validators/profile-setup";
import { Upload } from "lucide-react";
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface UserProfileImageProps {
  form: UseFormReturn<UserProfileSetup>;
}

const UserProfileImage = ({ form }: UserProfileImageProps) => {
  const [preview, setPreview] = useState("");
  return (
    <div className=" mx-4 mt-10 overflow-hidden">
      <div className="rounded-t-lg h-32 overflow-hidden">
        <div className="w-full h-64 border-2 border-gray-300  cursor-pointer bg-gray-50  ">
          <div className="group relative cursor-pointer "></div>
        </div>
      </div>

      <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
        <FormField
          control={form.control}
          name="profile_image"
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem>
              <FormLabel className="group relative cursor-pointer">
                <Avatar className="w-full h-32">
                  <AvatarImage
                    src={preview}
                    className="object-center object-cover"
                  />
                  <AvatarFallback className="bg-gray-100">
                    {<Icons.user className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
                <div className="group-hover:opacity-100 opacity-0 absolute w-full h-full bottom-0 bg-white/75 duration-200 text-black flex justify-center items-center">
                  <Upload />
                </div>
              </FormLabel>
              <FormControl>
                <Input
                  type="file"
                  className="hidden"
                  {...rest}
                  accept=".jpg, .jpeg, .png, .svg, .gif, .mp4"
                  onChange={(event) => {
                    const { files, displayUrl } = getImageData(event);
                    setPreview(displayUrl);
                    onChange(event.target.files ? event.target.files[0] : null);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default UserProfileImage;
