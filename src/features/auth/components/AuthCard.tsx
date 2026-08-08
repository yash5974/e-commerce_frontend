// import { Card, CardDescription, CardHeader, CardTitle } from "@/ui/card";
// import type { ReactNode } from "react";

// interface AuthCardProps {
//   title: string;
//   description?: string;
//   children: ReactNode;
// }

// export default function AuthCard({
//   title,
//   description,
//   children,
// }: AuthCardProps) {
//   return (
//     <Card className="mx-auto w-full max-w-md shadow-lg">
//       <CardHeader className="space-y-2 text-center">
//         <CardTitle className="text-2xl font-bold tracking-tight">
//           {title}
//         </CardTitle>

//         {description ? <CardDescription>{description}</CardDescription> : null}
//       </CardHeader>

//       {children}
//     </Card>
//   );
// }

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import type { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function AuthCard({
  title,
  description,
  children,
}: AuthCardProps) {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-2xl">{title}</CardTitle>

        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      <CardContent>{children}</CardContent>
    </Card>
  );
}
