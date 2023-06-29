interface CustomRoute {
  path: string;
  meta?: {
    title: string;
  };
  clickable?: boolean;
  icon?: string;
  children?: CustomRoute[];
}
const defaultRoutes: CustomRoute[] = [
  {
    path: "/dashboard",
    meta: {
      title: "Dashboard",
    },
    icon: "DataAnalysis",
  },
  {
    path: "/form",
    meta: {
      title: "Form Example",
    },
    icon: "Tickets",
  },
  {
    path: "/table",
    meta: {
      title: "Table Example",
    },
    icon: "Tickets",
  },
  {
    path: "/nested",
    meta: {
      title: "Nested - 1",
    },
    icon: "Coin",
    children: [
      {
        path: "/nested",
        meta: {
          title: "1 - 1",
        },
      },
      {
        path: "/nested",
        meta: {
          title: "1 - 2",
        },
        children: [
          {
            path: "/nested",
            meta: {
              title: "1 - 2 - 1",
            },
          },
          {
            path: "/nested",
            meta: {
              title: "1 - 2 - 2",
            },
          },
        ],
      },
    ],
  },
];

const recursiveRoutes = (routes: CustomRoute[], parent: CustomRoute) => {
  routes.map((el) => {
    const { path, children } = el;
    const { path: parentPath } = parent || {};
    el.path = (parentPath || "") + path;
    if ((children || []).length > 0) {
      el.clickable = false;
      recursiveRoutes(el.children || [], el);
    } else {
      el.clickable = true;
    }
    return el;
  });
};
recursiveRoutes(defaultRoutes, {
  path: "",
});
export const useRoutes = () => {
  return [...defaultRoutes];
};
