import * as React from "react";
import {
  Frame,
  PieChart,
  SquareTerminal,
  TramFront,
  Waypoints,
} from "lucide-react";

import { NavMain } from "@/Components/nav-main";
import { NavProjects } from "@/Components/nav-projects";
import { NavUser } from "@/Components/nav-user";
import { TeamSwitcher } from "@/Components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/Components/ui/sidebar";
import useAuth from "@/Hooks/useAuth";

const data = {
  teams: [
    {
      name: "RailBD",
      logo: TramFront,
      plan: "Admin",
    },
  ],
  navMain: [
    {
      title: "Manage Trains",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Add Train",
          url: "add-train",
        },
        {
          title: "Edit Train",
          url: "edit-train",
        },
        {
          title: "Train List",
          url: "train-list",
        },
        {
          title: "Train Details",
          url: "train-details",
        },
        {
          title: "Train Schedule",
          url: "train-schedule",
        },
      ],
    },
    {
      title: "Manage Stations",
      url: "#",
      icon: Waypoints,
      items: [
        {
          title: "Add Station",
          url: "add-station",
        },
        {
          title: "Edit Station",
          url: "edit-station",
        },
        {
          title: "Station List",
          url: "station-list",
        },
        {
          title: "Station Details",
          url: "station-details",
        },
        {
          title: "Station Schedule",
          url: "station-schedule",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Add User",
      url: "add-user",
      icon: Frame,
    },
    {
      name: "Manage User",
      url: "manage-user",
      icon: PieChart,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();
  const userdata = {
    name: user?.name || "Unknown User",
    email: user?.email || "unknown@example.com",
    avatar: "https://avatar.iran.liara.run/public",
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userdata} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
