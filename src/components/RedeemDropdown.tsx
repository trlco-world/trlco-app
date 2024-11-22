import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function RedeemDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"secondary"}
          className="px-3 border border-red-500 rounded-3xl text-sm text-red-500 bg-white hover:bg-slate-200"
        >
          Redeem
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 bg-white text-black rounded-2xl border-none p-2">
        <DropdownMenuItem className="rounded-2xl focus:text-black focus:bg-gray-200">
          <span>Redeem in $USDT</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="rounded-2xl focus:text-black focus:bg-gray-200">
          <span>Redeem in $TRLCO</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
