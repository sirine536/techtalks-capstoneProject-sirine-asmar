import {
  FiCompass,
  FiGrid,
  FiUsers,
  FiFileText,
  FiBookmark,
  FiUser,
  FiSettings,
} from "react-icons/fi";

export const navItems = [
  { label: "Explore", href: "/", icon: FiCompass },
  { label: "Dashboard", href: "/dashboard", icon: FiGrid },
  { label: "Communities", href: "/communities", icon: FiUsers },
  
  { label: "Blogs", href: "/blogs", icon: FiFileText },
  { label: "Bookmarks", href: "/bookmarks", icon: FiBookmark },
  { label: "Profile", href: "/profile", icon: FiUser },
  { label: "Settings", href: "/settings", icon: FiSettings },
];