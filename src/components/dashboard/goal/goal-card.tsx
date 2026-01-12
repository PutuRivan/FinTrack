import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatRupiah } from "@/lib/utils";

export default function GoalCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">
          Goal Name
        </CardTitle>
        <CardDescription>Target:Desember 2026</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-2 text-muted-foreground mb-2">
          <span className="">
            {formatRupiah(10000)}/{formatRupiah(15000)}
          </span>
          <span className="">{66}%</span>
        </div>
        <Progress value={66} />
      </CardContent>
    </Card>
  );
}
