import { FC, ReactNode } from "react";

import { RouteConstant } from "@common/enums/routes";


export interface Route {
    title: string;
    pathname: string;
    Icon: React.ElementType | null;
}
