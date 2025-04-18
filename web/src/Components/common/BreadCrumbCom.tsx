import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

const BreadCrumbCom = () => {
  const lists = [
    { name: "Dashboard", link: "#" },
    { name: "Manage Train", link: "#" },
  ];
  const len = lists.length;
  return (
    <Breadcrumb className="flex flex-col">
      <BreadcrumbList>
        {lists.slice(0, len - 1).map((item, index) => (
          <React.Fragment key={index + 10}>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href={item.link}>{item.name}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
          </React.Fragment>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage> {lists[len - 1].name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbCom;
