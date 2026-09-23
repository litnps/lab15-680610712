import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { courses, currentStudent } from "@/lib/mock-data";
import type { Enrollment } from "@/lib/types";

const getCurrentTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

type RegisterDialogProps = {
  enrollments: Enrollment[];
  onEnroll: (enrollment: Enrollment) => void;
};

export function RegisterDialog({ enrollments, onEnroll }: RegisterDialogProps) {
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [time, setTime] = useState(getCurrentTime());
  const [isSelected, setSelected] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const [hours, minutes] = time.split(":").map(Number);
    const enrolledAt = new Date();
    enrolledAt.setHours(hours, minutes, 0, 0);

    onEnroll({
      studentId: currentStudent.studentId,
      courseId,
      enrolledAt: enrolledAt.toISOString(),
    });

    setOpen(false);
    setCourseId("");
    setSelected(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button onClick={() => setTime(getCurrentTime())}>ลงทะเบียน</Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>ลงทะเบียนรายวิชา</DialogTitle>
            <DialogDescription>กรอกข้อมูลเพื่อลงทะเบียน</DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="courseId">วิชา</Label>
            <Select
              value={ courseId ? `${courseId} - ${courses.find((c) => c.courseId === courseId)?.courseTitle}` : ""}
              onValueChange={(value) => {
                setCourseId(value ? value : "");
                setSelected(true);
              }}
            >
              <SelectTrigger className="w-full max-w-87">
                <SelectValue placeholder="เลือกรายวิชาที่ต้องการลงทะเบียน" />
              </SelectTrigger>

              <SelectContent alignItemWithTrigger={false}>
                <SelectGroup>
                  {courses
                    .filter(
                      (c) =>
                        enrollments.findIndex(
                          (e) =>
                            e.courseId === c.courseId &&
                            e.studentId === currentStudent.studentId
                        ) === -1
                    )
                    .map((item) => (
                      <SelectItem
                        key={item.courseId}
                        value={item.courseId}
                        className="h-auto py-2"
                      >
                        {item.courseId} - {item.courseTitle}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time-picker">เวลา</Label>
            <Input
              id="time-picker"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">ชื่อ-นามสกุล</Label>
            <Input id="fullName" value="Lalitnapas Pasasuk" readOnly />
          </div>

          <div className="space-y-2">
            <Label htmlFor="studentId">รหัสนักศึกษา</Label>
            <Input id="studentId" value="680610712" readOnly />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={!isSelected}>
              ยืนยัน
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}