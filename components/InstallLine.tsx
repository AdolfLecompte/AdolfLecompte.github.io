import { CopyCommand } from "./CopyCommand";
import { readInstallLine } from "../lib/installLine";

export function InstallLine() {
  return <CopyCommand command={readInstallLine()} />;
}
