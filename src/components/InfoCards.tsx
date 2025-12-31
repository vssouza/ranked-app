import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type InfoCardProps = {
  top: React.ReactNode;
  title: string;
  description: string;
  className?: string;
};

export function InfoCard({
  top,
  title,
  description,
  className,
}: InfoCardProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader className="text-center">
        <div className="flex flex-col items-center gap-5">
          {top}
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </CardContent>
    </Card>
  );
}
