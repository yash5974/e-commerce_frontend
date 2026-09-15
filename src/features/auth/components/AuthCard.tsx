// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/ui/card";
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
//     <Card className="w-full shadow-lg">
//       <CardHeader className="space-y-2 text-center">
//         <CardTitle className="text-2xl">{title}</CardTitle>

//         {description && <CardDescription>{description}</CardDescription>}
//       </CardHeader>

//       <CardContent>{children}</CardContent>
//     </Card>
//   );
// }

import type { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";

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
      <CardHeader className="w-full space-y-2 text-center">
        <CardTitle className="text-2xl">{title}</CardTitle>

        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      <CardContent className="w-full">{children}</CardContent>
    </Card>
  );
}
