import { en, enCategories, enTags } from "./en";
import { zh_cn, zh_cnCategories, zh_cnTags } from "./zh_cn";
import type { Languages } from "../../config";

export const message: Record<Languages, Record<string, string>> = {
  en,
  "zh-CN": zh_cn,
};

export const messageCategories: Record<
  Languages,
  Record<string, { name: string; description: string }>
> = {
  en: enCategories,
  "zh-CN": zh_cnCategories,
};

export const messageTags: Record<Languages, Record<string, string>> = {
  en: enTags,
  "zh-CN": zh_cnTags,
};
