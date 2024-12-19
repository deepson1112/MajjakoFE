"use client";
import { Step, type StepItem, Stepper, useStepper } from "@/components/stepper";
import { Button } from "@/components/ui/Button";
import { ProfileSchema } from "@/lib/validators/profilesteps";
import React, { useState } from "react";
import { FirstStepForm } from "./FirstStepForm";
import { SecondStepForm } from "./SecondStepForm";
import { FinalStepForm } from "./FinalStepForm";
import { OfferList, UserType } from "@/types";
import { UserEntity } from "@/types/models";
import { SignOutModal } from "@/components/SignOutModal";
import { useQuery } from "react-query";
import { api } from "@/lib/fetcher";
import ListLoader from "@/components/loaders/ListLoader";

const steps = [
  { label: "Profile setup" },
  { label: "Address setup" },
  { label: "Business setup" },
] satisfies StepItem[];

interface StepFormProps {
  user: UserEntity;
  offersList: OfferList[] | undefined;
  offersListLoader: boolean;
  bussinessName: string | undefined;
}

export default function StepForm({
  bussinessName,
  user,
  offersList,
  offersListLoader,
}: StepFormProps) {
  const [vendorProile, setVendorProfile] = useState<ProfileSchema>({
    phone: user?.phone_number || "",
    vendor_name: bussinessName || "",
    role: "",
    vendor_city: "",
    vendor_location: "",
    cover_image: "",
    cover_image_url: undefined,
    description: "",
    is_resuturant: true,
    is_retail: false,
    offerings: [],
    profile_image: "",
    profile_image_url: undefined,
    vendor_location_latitude: "",
    vendor_location_longitude: "",
    vendor_pin_code: "",
    place_id: "",
  });

  console.log("VendorProfile", vendorProile);

  const { data: vendor, isLoading: vendorLoader } = useQuery({
    queryFn: async () => {
      const response = await api().get(`/user/user-update/`).json<UserType[]>();
      return response;
    },
    queryKey: ["vendor"],
    onSuccess: (data) => {
      setVendorProfile({
        phone: user?.phone_number || "",
        vendor_name: data[0].user.vendor_name,
        role: "",
        vendor_city: "",
        vendor_location: "",
        cover_image: "",
        cover_image_url: undefined,
        description: "",
        is_resuturant: true,
        is_retail: false,
        offerings: [],
        profile_image: "",
        profile_image_url: undefined,
        vendor_location_latitude: "",
        vendor_location_longitude: "",
        vendor_pin_code: "",
        place_id: "",
      });
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  console.log("This is vendor", vendor);

  return vendorLoader ? (
    <ListLoader />
  ) : (
    <div className="flex w-full flex-col gap-4">
      <Stepper initialStep={0} steps={steps}>
        {steps.map((stepProps, index) => {
          if (index === 0) {
            return (
              <Step key={stepProps.label} {...stepProps}>
                <FirstStepForm
                  setVendorProfile={setVendorProfile}
                  vendorProfile={vendorProile}
                />
              </Step>
            );
          } else if (index === 1) {
            return (
              <Step key={stepProps.label} {...stepProps}>
                <SecondStepForm
                  setVendorProfile={setVendorProfile}
                  vendorProfile={vendorProile}
                />
              </Step>
            );
          } else if (index === 2) {
            return (
              <Step key={stepProps.label} {...stepProps}>
                <FinalStepForm
                  setVendorProfile={setVendorProfile}
                  vendorProfile={vendorProile}
                  user={user?.vendor_id!}
                  offersList={offersList}
                  offersListLoader={offersListLoader}
                />
              </Step>
            );
          }
        })}
        <MyStepperFooter />
      </Stepper>
    </div>
  );
}

export function StepperFormActions() {
  const {
    prevStep,
    resetSteps,
    isDisabledStep,
    hasCompletedAllSteps,
    isLastStep,
  } = useStepper();

  return (
    <div className="flex items-center justify-between">
      <SignOutModal contents={"You sure want to cancel profile setup process."}>
        <Button type="button" variant={"subtle"}>
          Cancel
        </Button>
      </SignOutModal>
      <div className="w-full flex justify-end gap-2">
        {hasCompletedAllSteps ? (
          <Button size="sm" type="button" onClick={resetSteps}>
            Reset
          </Button>
        ) : (
          <>
            <Button
              disabled={isDisabledStep}
              onClick={prevStep}
              size="sm"
              variant="default"
              type="button"
            >
              Prev
            </Button>
            <Button size="sm" type="submit">
              {isLastStep ? "Finish" : "Next"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
export function StepperFormSubmit({ isLoading }: { isLoading: boolean }) {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const {
    prevStep,
    resetSteps,
    isDisabledStep,
    hasCompletedAllSteps,
    isLastStep,
  } = useStepper();

  return (
    <div className="flex items-center justify-between">
      <SignOutModal contents={"You sure want to cancel profile setup process."}>
        <Button type="button" variant={"subtle"}>
          Cancel
        </Button>
      </SignOutModal>

      <div className="w-full flex justify-end gap-2">
        {hasCompletedAllSteps ? (
          <Button size="sm" type="button" onClick={resetSteps}>
            Reset
          </Button>
        ) : (
          <>
            <Button
              disabled={isDisabledStep}
              onClick={prevStep}
              size="sm"
              variant="default"
              type="button"
            >
              Prev
            </Button>
            <Button
              size="sm"
              type="submit"
              isLoading={isLoading}
              disabled={isLoading}
            >
              {isLastStep ? "Complete" : "Next"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

function MyStepperFooter() {
  const { activeStep, resetSteps, steps } = useStepper();

  if (activeStep !== steps.length) {
    return null;
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <Button onClick={resetSteps}>Reset Stepper with Form</Button>
      <Button onClick={resetSteps}>Finish</Button>
    </div>
  );
}
