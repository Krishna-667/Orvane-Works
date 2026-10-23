import { Loader2 } from "lucide-react";

export default function EmployeeLoading() {
  return (
    <div className="container py-16 flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4">
      <Loader2 className="w-8 h-8 animate-spin text-vermilion" />
      <p className="text-sm font-medium text-muted-foreground animate-pulse">
        Loading employee queue and assigned projects...
      </p>
    </div>
  );
}
