import {Button} from "@/components/ui/button";
import {Building2, ChevronsUpDown} from "lucide-react";

export function OrgSwitcher() {
  // Placeholder for now — later this will be driven by org context + /me
  return (
    <Button variant="outline" disabled className="gap-2 max-w-60">
      <Building2 className="h-4 w-4 shrink-0" />
      <span className="truncate">Select organization</span>
      <ChevronsUpDown className="h-4 w-4 opacity-60  shrink-0" />
    </Button>
  );
}
