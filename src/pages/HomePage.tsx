import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Link } from "react-router";
import {Button} from "../components/ui/button";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center gap-4">

      <Card>
        <CardContent className="flex flex-col items-start gap-5 p-8">
          <p className="font-bold">
            ระบบลงทะเบียนเรียน CPE - ISNE
          </p>
          
          <Button 
            type="button"
            variant="secondary"
          >
            <Link to="/enrollment">ไปหน้าลงทะเบียนเรียน</Link>
          </Button>
        </CardContent>
      </Card>

      <p className="text-center text-xs text-muted-foreground">จัดทำโดย Lalitnapas Pasasuk รหัสนักศึกษา 680610712</p>
    </div>
  );
}
