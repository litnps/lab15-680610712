import { useState } from "react";
import { CourseCard } from "@/components/course-card";
import { RegisterDialog } from "@/components/register-dialog";
import { courses, currentStudent, enrollments as initialEnrollments } from "@/lib/mock-data";
import type { Enrollment as EnrollmentType } from "@/lib/types";

export default function Enrollment() {
  const [enrollments, setEnrollments] = useState<EnrollmentType[]>(initialEnrollments);

  function handleEnroll(enrollment: EnrollmentType) {
    setEnrollments((prev) => [...prev, enrollment]);
  }

  function handleUnenroll(studentId: string, courseId: string) {
    setEnrollments((prev) =>
      prev.filter((e) => !(e.studentId === studentId && e.courseId === courseId))
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">รายวิชาทั้งหมด</h1>
        </div>
        <RegisterDialog enrollments={enrollments} onEnroll={handleEnroll} />
      </div>

      <div className="flex flex-col gap-4">
        {courses.map((course) => {
          const enrollment = enrollments.find(
            (e) => e.courseId === course.courseId && e.studentId === currentStudent.studentId
          );
          return (
            <CourseCard
              key={course.courseId}
              course={course}
              student={currentStudent}
              enrolledAt={enrollment?.enrolledAt}
              isEnrolled={!!enrollment}
              onUnenroll={() => handleUnenroll(currentStudent.studentId, course.courseId)}
            />
          );
        })}
      </div>
    </div>
  );
}