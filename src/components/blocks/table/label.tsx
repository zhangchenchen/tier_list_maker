import { Badge } from "@/components/ui/badge";

export default function TableItemLabel({
  value,
  options,
  className,
}: {
  value: string;
  options?: any;
  className?: string;
}) {
  return (
    <Badge variant={options?.variant ?? "secondary"} className={className}>
      {value}
    </Badge>
  );
}
