import { RouteConstant } from "@common/enums/routes";
import { FC, ReactNode } from "react";


export interface Route {
    title: string;
    pathname: string;
    Icon: React.ElementType | null;
}
