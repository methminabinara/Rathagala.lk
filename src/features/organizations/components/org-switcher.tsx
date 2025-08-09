"use client";

import React, { useId, useState, useEffect } from "react";
import { ChevronsUpDown, CogIcon, GraduationCap } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { Skeleton } from "@/components/ui/skeleton";

export function OrgSwitcher() {
  const toastId = useId();
  const { isMobile } = useSidebar();
  const [mounted, setMounted] = useState(false);

  const { data: activeOrg, isPending: isPendingActiveOrg } =
    authClient.useActiveOrganization();
  const { data: allOrgs, isPending: isPendingAllOrgs } =
    authClient.useListOrganizations();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until after hydration
  if (!mounted) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="flex w-full items-center gap-2 p-2">
            <Skeleton className="aspect-square size-8 rounded-lg" />
            <div className="grid flex-1 gap-1">
              <Skeleton className="h-4 w-[120px]" />
              <Skeleton className="h-3 w-[80px]" />
            </div>
            <Skeleton className="size-4" />
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  const handleSetActiveOrganization = async (id: string) => {
    await authClient.organization.setActive(
      {
        organizationId: id
      },
      {
        onRequest() {
          toast.loading("Switching organization...", { id: toastId });
        },
        onSuccess() {
          toast.success("Switched to organization successfully!", {
            id: toastId
          });
        },
        onError({ error }) {
          toast.error(error.message || "Failed to switch organization", {
            id: toastId
          });
        }
      }
    );
  };

  const renderActiveClassContent = () => {
    if (isPendingActiveOrg) {
      return (
        <div className="flex w-full items-center gap-2 p-2">
          <Skeleton className="aspect-square size-8 rounded-lg" />
          <div className="grid flex-1 gap-1">
            <Skeleton className="h-4 w-[120px]" />
            <Skeleton className="h-3 w-[80px]" />
          </div>
          <Skeleton className="size-4" />
        </div>
      );
    }

    if (!activeOrg) {
      return (
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <GraduationCap className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">
              Select an Organization
            </span>
          </div>
          <ChevronsUpDown className="ml-auto" />
        </SidebarMenuButton>
      );
    }

    return (
      <SidebarMenuButton
        size="lg"
        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
      >
        {activeOrg?.logo ? (
          <Image
            alt={activeOrg.name}
            src={activeOrg.logo}
            width={50}
            height={50}
            className="flex aspect-square size-8 rounded-lg object-cover"
          />
        ) : (
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            {activeOrg?.name.slice(0, 2)}
          </div>
        )}

        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">{activeOrg?.name}</span>
          <span className="truncate text-xs text-foreground/60">
            {activeOrg?.metadata &&
              JSON.parse(activeOrg?.metadata)?.description}
          </span>
        </div>
        <ChevronsUpDown className="ml-auto" />
      </SidebarMenuButton>
    );
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {renderActiveClassContent()}
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Organizations
            </DropdownMenuLabel>
            {!isPendingAllOrgs && allOrgs ? (
              allOrgs.map((org) => (
                <DropdownMenuItem
                  key={org.id}
                  onClick={() => handleSetActiveOrganization(org.id)}
                  className="gap-2 p-2"
                >
                  {org?.logo ? (
                    <Image
                      alt={org.name}
                      src={org.logo}
                      width={50}
                      height={50}
                      className="flex aspect-square size-6 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex size-6 items-center justify-center rounded-sm border">
                      {org?.name.slice(0, 2)}
                    </div>
                  )}
                  {org.name}
                </DropdownMenuItem>
              ))
            ) : (
              <div className="space-y-2">
                {Array(5)
                  .fill("_")
                  .map((_, index) => (
                    <div
                      key={index}
                      className="flex w-full items-center gap-2 p-2"
                    >
                      <Skeleton className="aspect-square size-6 rounded-lg" />
                      <div className="grid flex-1 gap-1">
                        <Skeleton className="h-4 w-[100px]" />
                        <Skeleton className="h-3 w-[60px]" />
                      </div>
                    </div>
                  ))}
              </div>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link className="gap-2 p-2" href="/dashboard/organizations">
                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                  <CogIcon className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">
                  Manage Organizations
                </div>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
