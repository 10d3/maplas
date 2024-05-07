"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PropsWithChildren } from "react"
import { signOutAction } from "./aut.action"
import { LogOut, Shield, User } from 'lucide-react'
import Link from "next/link"

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
                <DropdownMenuItem>
                    <Link className="flex flex-row gap-1 items-center" href='/admin'>
                        <User size={15} /> Profile
                    </Link>
                </DropdownMenuItem>
                {/* <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem> */}
                <DropdownMenuItem>
                    <Link className="flex flex-row gap-1 items-center" href='/admin'>
                        <Shield size={15} />Admin
                    </Link>
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