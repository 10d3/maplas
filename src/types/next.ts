import { ReactNode } from "react";

export type LayoutParams<T extends Record<string, string | string[]>> = {
  children: React.ReactNode;
  params: T;
};

export type SearchParams<T extends Record<string, string | string[]>> = {
  params: T;
  searchParams: { [key: string]: string | string[] | undefined };
};

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export type EventProps2 = {
  id: string;
  name: string;
  description: string;
  eventType: string;
  startDate: Date;
  endDate: Date;
  location: string;
  image: string;
  vipTicketPrice: string;
  standardTicketPrice: string;
  vipTicketCapacity: string;
  standardTicketCapacity: string;
};

export type EventProps = {
  id: string;
  name: string;
  slug: string;
  description: string;
  eventType: string;
  location: string;
  image: string | null;
  startDate: Date;
  endDate: Date;
  vipTicketPrice?: string | null;
  standardTicketPrice?: string | null;
  vipTicketCapacity?: string | null;
  standardTicketCapacity: string;
  createdById: string;
};
export type CreateEventParams = {
  userId: string;
  event: {
    name: string;
    description: string;
    eventType: string;
    location: string;
    image: string;
    startDate: Date;
    endDate: Date;
    vipTicketPrice?: string | undefined;
    standardTicketPrice?: string | undefined;
    vipTicketCapacity?: string | undefined;
    standardTicketCapacity: string;
  };
  path: string;
};
export type CreateEventParams2 = {
  userId: string;
  eventId: string;
  event: {
    name: string;
    description: string;
    eventType: string;
    location: string;
    image: string;
    startDate: Date;
    endDate: Date;
    vipTicketPrice?: string;
    standardTicketPrice?: string;
    vipTicketCapacity?: string;
    standardTicketCapacity: string;
  };
  path: string;
};
// vipTicketPrice? : string | undefined;
// standardTicketPrice? : string | undefined;
// vipTicketCapacity? : string | undefined;
// standardTicketCapacity : string;

export type UpdateEventParams = {
  userId: string;
  event: {
    name: string;
    description: string;
    eventType: string;
    location: string;
    image: string;
    startDate: Date;
    endDate: Date;
    vipTicketPrice?: string | undefined;
    standardTicketPrice?: string | undefined;
    vipTicketCapacity?: string | undefined;
    standardTicketCapacity: string;
  };
  path: string;
};

export interface EventOR {
  id: string;
    name: string;
    slug: string;
    description: string;
    eventType: string;
    startDate: Date;
    endDate: Date;
    location: string;
    image: string;
    vipTicketPrice: string;
    standardTicketPrice: string;
    createdById: string;
    approved: boolean;
    createdBy: {
        id: string;
        name: string | null;
        email: string | null;
        emailVerified: Date | null;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
        superAdmin: boolean;
        isVerify: boolean;
    };
}
