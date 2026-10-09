import {
  SiReact,
  SiNextdotjs,
  SiPhp,
  SiLaravel,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiNodedotjs,
  SiVuedotjs,
  SiAngular,
} from "react-icons/si";
import { FiCode } from "react-icons/fi";

const iconMap: Record<string, { icon: any; bg: string; color: string }> = {
  react: { icon: SiReact, bg: "bg-[#61DAFB]/15", color: "text-[#61DAFB]" },
  reactjs: { icon: SiReact, bg: "bg-[#61DAFB]/15", color: "text-[#61DAFB]" },
  nextjs: { icon: SiNextdotjs, bg: "bg-white/10", color: "text-white" },
  "next.js": { icon: SiNextdotjs, bg: "bg-white/10", color: "text-white" },
  php: { icon: SiPhp, bg: "bg-[#777BB4]/15", color: "text-[#777BB4]" },
  laravel: { icon: SiLaravel, bg: "bg-[#FF2D20]/15", color: "text-[#FF2D20]" },
  javascript: { icon: SiJavascript, bg: "bg-[#F7DF1E]/15", color: "text-[#F7DF1E]" },
  typescript: { icon: SiTypescript, bg: "bg-[#3178C6]/15", color: "text-[#3178C6]" },
  python: { icon: SiPython, bg: "bg-[#3776AB]/15", color: "text-[#3776AB]" },
  "node.js": { icon: SiNodedotjs, bg: "bg-[#339933]/15", color: "text-[#339933]" },
  nodejs: { icon: SiNodedotjs, bg: "bg-[#339933]/15", color: "text-[#339933]" },
  vue: { icon: SiVuedotjs, bg: "bg-[#4FC08D]/15", color: "text-[#4FC08D]" },
  angular: { icon: SiAngular, bg: "bg-[#DD0031]/15", color: "text-[#DD0031]" },
};

export function getTechIcon(name: string) {
  const key = name.trim().toLowerCase();
  return iconMap[key] || { icon: FiCode, bg: "bg-[#7C6FF5]/15", color: "text-[#7C6FF5]" };
}