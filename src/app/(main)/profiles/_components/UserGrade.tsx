"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";
import { getGradeForPoint, valueRanges } from "@/libs/grade";
import { cn } from "@/libs/utils";

interface UserGradeProps {
  point: number;
}

const UserGrade = ({ point }: UserGradeProps) => {
  const range = valueRanges.find((r) => point >= r.min && point <= r.max);
  const gradeName = range?.name;
  const borderColor = getGradeForPoint(point);
  return (
    <div className="flex flex-col">
      <div
        className={cn({
          "text-orange-900": borderColor === "bronze",
          "text-silver": borderColor === "silver",
          "text-yellow-500": borderColor === "gold",
          "text-emerald-500": borderColor === "emerald",
          "text-blue-500": borderColor === "diamond",
          "text-rose-500": borderColor === "ruby",
        })}
      >
        {gradeName} {point}
      </div>
      <Progress value={point} className="h-6 rounded-md mt-1" />
    </div>
  );
};

export default UserGrade;
