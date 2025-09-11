import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./Theme";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          {/* Sun */}
          <Sun
            className={`h-5 w-5 transition-all ${
              theme === "dark" ? "scale-0 -rotate-90" : "scale-100 rotate-0"
            }`}
          />
          {/* Moon */}
          <Moon
            className={`absolute h-5 w-5 transition-all ${
              theme === "dark" ? "scale-100 rotate-0" : "scale-0 rotate-90"
            }`}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
