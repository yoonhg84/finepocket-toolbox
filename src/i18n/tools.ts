import type { ToolMeta } from "@/lib/tools-registry";
import type { TranslateFn } from "./translate";

export function getLocalizedToolText(tool: ToolMeta, t: TranslateFn) {
  return {
    name: t(`tools.${tool.slug}.name`, undefined, tool.name),
    shortDescription: t(
      `tools.${tool.slug}.shortDescription`,
      undefined,
      tool.shortDescription
    ),
  };
}

