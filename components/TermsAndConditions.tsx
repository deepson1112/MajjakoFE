import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/Alert-dialog";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/Form";
import { UseFormReturn } from "react-hook-form";
import { Checkbox } from "./ui/Checkbox";
import { UserSignUp } from "@/lib/validators/user";
import React from "react";

interface TermsAndConditionsProps {
  form: UseFormReturn<UserSignUp>;
}

const TermsAndConditionsContains = [
  {
    header: "1. ACCOUNT REGISTRATION AND USE",
    subHeader: [
      {
        subHeading: "1.1 Account Creation:",
        points: [
          "It might be necessary for you to create an account in order to enjoy some of the Platform's features.",
          "Complete and accurate information must be entered throughout the registration process.",
        ],
      },
      {
        subHeading: "1.2 Account Security:",
        points: [
          "It is your responsibility to keep the information associated with your account private.",
          "Any unauthorized use of your account should be reported to us right away.",
        ],
      },
    ],
  },
  {
    header: "2. ORDERING AND PAYMENT",
    subHeader: [
      {
        subHeading: "2.1 Place of Order:",
        points: [
          "Through the Platform, users can order food and drinks from participating restaurants.",
        ],
      },
      {
        subHeading: "2.2 Payment:",
        points: [
          "Users agree to pay all fees, taxes, and delivery charges that are incurred on their account for orders.",
          "The approved payment methods will be listed on the Platform.",
        ],
      },
    ],
  },
  {
    header: "3. DELIVERY AND SERVICE",
    subHeader: [
      {
        subHeading: "3.1 Delivery:",
        points: [
          "Delivery windows and covered regions will be listed on the Platform.",
          "Delivery services may incur fees for users, but these fees will always be made explicit.",
        ],
      },
      {
        subHeading: "3.2 Issues with Services:",
        points: [
          "Order or delivery problems should be reported as soon as possible.",
          "Our Refund Policy will contain information on replacement and refund practices.",
        ],
      },
    ],
  },
  {
    header: "4. USER ACTIONS",
    subHeader: [
      {
        subHeading: "4.1 Acceptable Use:",
        points: [
          "Users consent to using the Platform exclusively for legitimate reasons.",
          "Activities that are prohibited will be listed in the Acceptable Use Policy.",
        ],
      },
    ],
  },
  {
    header: "5. INTELLECTUAL PROPERTY",
    subHeader: [
      {
        subHeading: "5.1 Ownership:",
        points: [
          "Delta V Logics & Solutions (DVLS) is the owner or license of the content on the Platform.",
          "Without authorization, users are not permitted to use, copy, or distribute the content.",
        ],
      },
    ],
  },
  {
    header: "6. PRIVACY POLICY",
    subHeader: [
      {
        subHeading: "6.1 Data Collection:",
        points: [
          "For details on the methods used, safeguarded, and collection of user data, see the Privacy Policy.",
        ],
      },
    ],
  },
  {
    header: "7. LIMITATION OF LIABILITY",
    subHeader: [
      {
        subHeading: "7.1 Disclaimer:",
        points: [
          "It is not the responsibility of Delta V Logics & Solutions (DVLS) to ensure the food supplied by participating restaurants is safe or of high quality.",
          "The Disclaimer section will contain information on liability limitations.",
        ],
      },
    ],
  },
  {
    header: "8. TERMINATION",
    subHeader: [
      {
        subHeading: "8.1 Termination:",
        points: [
          "In the event that these Terms are broken, Delta V Logics & Solutions (DVLS) has the right to suspend or terminate user accounts.",
        ],
      },
    ],
  },
  {
    header: "9. GOVERNING LAW",
    subHeader: [
      {
        subHeading: "9.1 Jurisdiction:",
        points: [
          'The laws of "Jurisdiction" apply to these Terms.',
          'Any disagreements will be settled in the "Jurisdiction" courts.',
        ],
      },
    ],
  },
  {
    header: "10. CHANGES TO TERMS",
    subHeader: [
      {
        subHeading: "10.1 Changes:",
        points: [
          "Delta V Logics & Solutions (DVLS) is entitled to make changes to these Terms. Any changes will be communicated to users, and their continued use of the Platform indicates their agreement to the updated Terms.",
        ],
      },
    ],
  },
  {
    header: "11. CONTACT INFORMATION",
    subHeader: [
      {
        subHeading: "11.1 Contact:",
        points: [
          "For inquiries or support, contact support@chowchowexpress.com.",
        ],
      },
    ],
  },
];

export function TermsAndConditions({ form }: TermsAndConditionsProps) {
  return (
    <FormField
      control={form.control}
      name="terms_conditions"
      render={({ field }) => {
        return (
          <FormItem className="flex flex-col space-y-2">
            <div className="flex items-center space-x-3">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="text-sm font-normal">
                Accept <TermsAndConditionsModal />
              </FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

function TermsAndConditionsModal() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <span className="text-brand hover:underline cursor-pointer">
          Terms & Conditions
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Terms & Conditions</AlertDialogTitle>
          <AlertDialogDescription>
            These Terms and Conditions of Use (&quot;Terms&quot;) govern your
            use of Majjakodeals, including any related mobile applications
            (collectively, the &quot;Platform&quot;). By accessing or using the
            Platform, you agree to be bound by these Terms. If you do not agree
            with these Terms, please do not use the Platform.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="max-h-72 overflow-auto">
          <ul>
            {TermsAndConditionsContains.map((content) => (
              <div key={content.header}>
                <h3 className="font-bold my-2">{content.header}</h3>
                {content.subHeader.map((subContent) => (
                  <React.Fragment key={subContent.subHeading}>
                    <h6 className="font-semibold my-2">
                      {subContent.subHeading}
                    </h6>
                    <ul className="flex flex-col gap-3">
                      {subContent.points.map((subPoint, index) => (
                        <li key={index}>{subPoint}</li>
                      ))}
                    </ul>
                  </React.Fragment>
                ))}
              </div>
            ))}
          </ul>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel className={cn(buttonVariants())}>
            Close
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
