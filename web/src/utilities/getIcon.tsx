import React, { useEffect, useState } from "react";
import * as fa6 from "react-icons/fa6";
import * as fa from "react-icons/fa";
import { IconType } from "react-icons";
import cn from "./cn";

type IconLibrary = "fa6" | "fa";

interface GetIconProps {
  icon: string; // e.g., "fa-lock"
  lib: IconLibrary;
  className?: string;
}

const iconpack: Record<IconLibrary, Record<string, IconType>> = {
  fa6,
  fa,
};

// Convert "fa-lock" -> "FaLock"
const toPascalCase = (str: string): string => {
  return str
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
};

const GetIcon: React.FC<GetIconProps> = ({ icon, lib, className = "" }) => {
  const [Icon, setIcon] = useState<IconType | null>(null);

  useEffect(() => {
    const iconKey = toPascalCase(icon); // "fa-lock" -> "FaLock"
    const SelectedIcon = iconpack[lib]?.[iconKey];

    if (SelectedIcon) {
      setIcon(() => SelectedIcon);
    } else {
      setIcon(null);
    }
  }, [icon, lib]);

  return <>{Icon && <Icon className={cn(`text-lg ${className}`)} />}</>;
};

export default GetIcon;
