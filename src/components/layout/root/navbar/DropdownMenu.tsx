// "use client";

// import { Link } from "@/navigation";
// import {
//   DropdownMenu as DropdownMenuPrimitive,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { cn } from "@/lib/utils";
// import { NavLink } from "@/types/NavLink";
// import { ChevronDown } from "lucide-react";
// import { useState } from "react";

// type NavbarDropdownMenuProps = {
//   label: string;
//   links: NavLink[];
//   pathname: string;
//   className?: string;
//   onLinkClick?: () => void;
// };

// const DropdownMenu = ({
//   label,
//   links,
//   pathname,
//   className,
//   onLinkClick,
// }: NavbarDropdownMenuProps) => {
//   const [open, setOpen] = useState(false);
//   const isLinkActive = (path: string) =>
//     pathname === path || pathname.startsWith(`${path}/`);
//   const isActive = links.some((link) => isLinkActive(link.path));

//   return (
//     <DropdownMenuPrimitive open={open} onOpenChange={setOpen}>
//       <DropdownMenuTrigger
//         className={cn(
//           "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary cursor-pointer",
//           isActive ? "text-primary" : "text-muted-foreground",
//           className,
//         )}
//       >
//         {label}
//         <ChevronDown
//           className={cn(
//             "h-4 w-4 transition-transform duration-200",
//             open && "rotate-180",
//           )}
//         />
//       </DropdownMenuTrigger>

//       <DropdownMenuContent align="start">
//         {links.map((link) => (
//           <DropdownMenuItem
//             key={link.path}
//             asChild
//             className={cn(isLinkActive(link.path) && "bg-accent")}
//           >
//             <Link href={link.path} onClick={onLinkClick}>
//               {link.name}
//             </Link>
//           </DropdownMenuItem>
//         ))}
//       </DropdownMenuContent>
//     </DropdownMenuPrimitive>
//   );
// };

// export default DropdownMenu;
