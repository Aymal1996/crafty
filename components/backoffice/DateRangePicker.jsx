"use client";

import * as React from "react";
import {
  format,
  subMonths,
  subYears,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfYear,
  endOfYear,
} from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDown,CalendarDays } from 'lucide-react'; // Adjust path as necessary
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export function DateRangePicker() {
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  // Handle preset date ranges
  const handlePresetSelection = (preset) => {
    const today = new Date();

    switch (preset) {
      case "Today":
        setStartDate(today);
        setEndDate(today);
        break;
      case "This Week":
        setStartDate(startOfWeek(today));
        setEndDate(endOfWeek(today));
        break;
      case "This Month":
        setStartDate(startOfMonth(today));
        setEndDate(endOfMonth(today));
        break;
      case "Last Year":
        setStartDate(startOfYear(subYears(today, 1)));
        setEndDate(endOfYear(subYears(today, 1)));
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex items-center gap-4">
      {/* Preset Date Range Dropdown */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="font-Vietnam border-gray-500 rounded-[5px]">
            Date Range <span className="ml-2"><ChevronDown size={22} /></span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-100">
          <p className="mb-2 font-regular font-Vietnam text-md">Select a preset date range:</p>
          <ul className="space-y-0">
            <li
              className="hover:bg-gray-100 cursor-pointer px-2 py-1 font-Vietnam text-2sm"
              onClick={() => handlePresetSelection("Today")}
            >
              Today
            </li>
            <li
              className="hover:bg-gray-100 cursor-pointer px-2 py-1 font-Vietnam text-2sm"
              onClick={() => handlePresetSelection("This Week")}
            >
              This Week
            </li>
            <li
              className="hover:bg-gray-100 cursor-pointer px-2 py-1 font-Vietnam text-2sm"
              onClick={() => handlePresetSelection("This Month")}
            >
              This Month
            </li>
            <li
              className="hover:bg-gray-100 cursor-pointer px-2 py-1 font-Vietnam text-2sm"
              onClick={() => handlePresetSelection("Last Year")}
            >
              Last Year
            </li>
          </ul>
        </PopoverContent>
      </Popover>

      {/* Start Date Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="font-Vietnam border-gray-500 rounded-[5px]">
            {format(startDate, "yyyy-MM-dd")} <CalendarDays />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Calendar
            selected={startDate}
            onSelect={(date) => {
              if (date) {
                setStartDate(date);
                if (date > endDate) {
                  setEndDate(date); // Ensure start date is not after end date
                }
              }
            }}
          />
        </PopoverContent>
      </Popover>

      {/* End Date Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="font-Vietnam border-gray-500 rounded-[5px]">
            {format(endDate, "yyyy-MM-dd")} <CalendarDays />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Calendar
            selected={endDate}
            onSelect={(date) => {
              if (date) {
                setEndDate(date);
                if (date < startDate) {
                  setStartDate(date); // Ensure end date is not before start date
                }
              }
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
