"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PropsWithChildren } from "react"
import { signOutAction } from "./aut.action"
import { LogOut } from 'lucide-react'

export type SignOutButtonProps = PropsWithChildren

export const SignOutButton = (props: SignOutButtonProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {props.children}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>
                    Admin
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                    signOutAction();
                }}>
                    <LogOut size={15} className="mr-2" />
                    sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}