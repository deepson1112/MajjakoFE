/**
 * v0 by Vercel.
 * @see https://v0.dev/t/odH5EuB7VVp
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  Select,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Dispatch, SetStateAction } from "react";

interface TimeSelectionProps {
  setSelectedTime: Dispatch<SetStateAction<{ hours: string; minutes: string }>>;
  selectedTime: { hours: string; minutes: string };
}

export default function TimeSelection({
  selectedTime,
  setSelectedTime,
}: TimeSelectionProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="hour">Hour</Label>
            <Select
              onValueChange={(e) =>
                setSelectedTime({ ...selectedTime, hours: e })
              }
            >
              <SelectTrigger aria-label="Hour" id="hour">
                <SelectValue placeholder="Hour" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="10">10 AM</SelectItem>
                  <SelectItem value="11">11 AM</SelectItem>
                  <SelectItem value="12">12 PM</SelectItem>
                  <SelectItem value="13">13 PM</SelectItem>
                  <SelectItem value="14">14 PM</SelectItem>
                  <SelectItem value="15">15 PM</SelectItem>
                  <SelectItem value="16">16 PM</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="minute">Minute</Label>
            <Select
              onValueChange={(e) =>
                setSelectedTime({ ...selectedTime, minutes: e })
              }
            >
              <SelectTrigger aria-label="Minute" id="minute">
                <SelectValue placeholder="Minute" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="00">00</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                  <SelectItem value="35">35</SelectItem>
                  <SelectItem value="40">40</SelectItem>
                  <SelectItem value="45">45</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
