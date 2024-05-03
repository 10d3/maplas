import { ReactNode } from "react"

export type LayoutParams< T extends Record<string, string | string[]>> = {
    children: React.ReactNode;
    params : T;
}

export type SearchParams< T extends Record<string, string | string[]>> = {
    params : T;
    searchParams:{[key:string]: string | string[] | undefined }
}