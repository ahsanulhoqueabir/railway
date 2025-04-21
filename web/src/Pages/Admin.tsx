import { AppSidebar } from "@/Components/app-sidebar";
import { Separator } from "@/Components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/Components/ui/sidebar";
import useAuth from "@/Hooks/useAuth";
import LoadingPage from "./LoadingPage";
import { Outlet } from "react-router-dom";
import BreadCrumbCom from "@/Components/common/BreadCrumbCom";
import { setTitle } from "@/utilities/funtions";

const Admin = () => {
  const { loading } = useAuth();
  setTitle("Admin Panel");

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <SidebarProvider className="">
      <AppSidebar />
      <SidebarInset className="bg-sidebar">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 ">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4 " />
            <BreadCrumbCom />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4  bg-sidebar px-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Admin;
