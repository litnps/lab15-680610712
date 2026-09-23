import type { Course, Student } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, formatThaiDateTime } from "@/lib/utils";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type CourseCardProps = {
  course: Course;
  student: Student;
  enrolledAt?: string;
  isEnrolled: boolean;
  onUnenroll: () => void;
};

export function CourseCard({
  course,
  student,
  enrolledAt,
  isEnrolled,
  onUnenroll,
}: CourseCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">{course.courseTitle} </CardTitle>
          <Badge
            variant="outline"
            className={cn(
              "rounded-full px-3 py-0.5 text-xs font-medium border-transparent",
              isEnrolled
                ? "bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-purple-950/60 dark:text-purple-300 dark:hover:bg-purple-950/60 dark:border-purple-800/40"
                : "bg-purple-100 text-purple-700 hover:bg-purple-100 dark:bg-amber-950/60 dark:text-amber-300 dark:hover:bg-amber-950/60 dark:border-amber-800/40"
            )}
          >
            {isEnrolled ? "ลงทะเบียนแล้ว" : "เปิดรับ"}
          </Badge>
        </div>
        <CardDescription>
          รหัสวิชา: {course.courseId} · ผู้สอน: {course.instructors.join(", ")}
        </CardDescription>
      </CardHeader>
      {isEnrolled && (
        <CardContent className="flex items-end justify-between">
          <div className="text-xs text-muted-foreground">
            <p>
              ชื่อ นศ.: {student.firstName} {student.lastName}
            </p>
            <p>โปรแกรม: {student.program}</p>
            <p>ลงทะเบียนเมื่อ: {formatThaiDateTime(enrolledAt)}</p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={onUnenroll}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </CardContent>
      )}
    </Card>
  );
}