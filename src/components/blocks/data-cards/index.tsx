import { IconTrendingDown } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataCard } from "@/types/blocks/base";

export default function DataCards({ dataCards }: { dataCards: DataCard[] }) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {dataCards.map((dataCard, index) => (
        <Card className="@container/card" key={index}>
          <CardHeader>
            <CardDescription>{dataCard.title}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {dataCard.value}
            </CardTitle>
            <CardAction>
              {dataCard.label && (
                <Badge variant="outline">{dataCard.label}</Badge>
              )}
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {dataCard.description}
            </div>
            <div className="text-muted-foreground">{dataCard.tip}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
