import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Session } from "next-auth";
import { signOut } from "@/auth";
import { Button } from "../ui/button";

type SettingProps = {
  session: Session;
}

async function handleSignOut() {
  "use server";
  console.log("ログアウト");
  await signOut({
    redirectTo: "/login",
  });
};

export default function Setting(props: SettingProps) {
  const { session } = props;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        {session.user?.name}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <form action={handleSignOut}>
          <DropdownMenuItem asChild className="cursor-pointer">
            <button type="submit">
              ログアウト
            </button>
          </DropdownMenuItem>  
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
