const gradients = [
  "from-[#7C6FF5] to-[#4B3FCC]",
  "from-[#F5A623] to-[#C77D00]",
  "from-[#22C55E] to-[#0F7A3D]",
  "from-[#EC4899] to-[#9D1857]",
  "from-[#3B82F6] to-[#1D4ED8]",
];

export function getPostGradient(seed: string) {
  const index = seed
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0) % gradients.length;
  return gradients[index];
}