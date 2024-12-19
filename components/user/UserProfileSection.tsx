"use client";
import React from "react";
import Image from "next/image";
import { UserEntity, UserEntityMe } from "@/types/models";
import { capitalizeWord } from "@/lib/utils";

const UserProfileSection = ({
  role,
  cover_photo,
  first_name,
  last_name,
  profile_picture,
}: UserEntity) => {
  return (
    <header className="relative isolate pt-16 m-4 rounded-lg overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-full h-full">
          {!!cover_photo ? (
            <Image
              alt="resturatn-cover-image"
              src={cover_photo}
              width={1920}
              height={1080}
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <div className="w-full h-full bg-gray-100"></div>
          )}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-full bg-gray-900/30" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none">
          <div className="flex items-center gap-x-6">
            {profile_picture ? (
              <Image
                src={profile_picture}
                alt="Restuarnt-img"
                width={500}
                height={500}
                className="h-20 w-20 sm:h-32 sm:w-32 flex-none object-cover object-center rounded-full ring-2 ring-white"
              />
            ) : (
              <div className="h-20 w-20 sm:h-32 sm:w-32 flex-none bg-gray-100 rounded-full ring-2 ring-white"></div>
            )}

            <h1>
              <div className="mt-1 text-base font-semibold leading-6 text-gray-200">
                {role === 1
                  ? `${capitalizeWord(first_name)} ${capitalizeWord(last_name)}`
                  : `${capitalizeWord(first_name)} ${capitalizeWord(
                      last_name
                    )}`}
              </div>
              <div className="text-sm leading-6 text-gray-300">
                Kathmandu, Nepal
              </div>
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserProfileSection;
