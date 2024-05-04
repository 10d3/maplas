import { ReactNode } from "react";

export type LayoutParams<T extends Record<string, string | string[]>> = {
  children: React.ReactNode;
  params: T;
};

export type SearchParams<T extends Record<string, string | string[]>> = {
  params: T;
  searchParams: { [key: string]: string | string[] | undefined };
};

export type CreateEventParams = {
  userId: string;
  event: {
    name: string;
    description: string;
    eventType: string;
    location: string;
    image: string;
    date: Date;
    vipTicketPrice? : string | undefined;
    standardTicketPrice? : string | undefined;
    vipTicketCapacity? : string | undefined;
    standardTicketCapacity : string;
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
    _id: string;
    title: string;
    imageUrl: string;
    description: string;
    location: string;
    startDateTime: Date;
    endDateTime: Date;
    categoryId: string;
    price: string;
    isFree: boolean;
    url: string;
  };
  path: string;
};
