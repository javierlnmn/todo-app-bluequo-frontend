import { Route } from "@common/types/routes";
import HomeIcon from "@icons/HomeIcon";
import TaskListIcon from "@icons/TaskListIcon";


export const sidebarRouteConstants = {
    HOME: "/",
    TODOS: "/todos",
}

export const sidebarRoutes: Route[] = [
    {
        title: 'Home',
        pathname: sidebarRouteConstants.HOME,
        Icon: HomeIcon,
    },
    {
        title: 'Todos',
        pathname: sidebarRouteConstants.TODOS,
        Icon: TaskListIcon,
    },
];
