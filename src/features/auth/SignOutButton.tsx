"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PropsWithChildren } from "react"
import { signOutAction } from "./aut.action"
import {LogOut} from 'lucide-react'

export type SignOutButtonProps = PropsWithChildren

export const SignOutButton = (props: SignOutButtonProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {props.children}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                    <DropdownMenuItem  onClick={ () => {
                             signOutAction();
                        }}>
                        <LogOut size={15}className="mr-2"/>
                        sign out
                    </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}