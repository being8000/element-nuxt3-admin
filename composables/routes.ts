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
    path: "/",
    meta: {
      title: "Dashboard",
    },
    icon: "DataAnalysis",
  },
  {
    path: "/richtext",
    meta: {
      title: "Richtext Editor",
    },
    icon: "Tickets",
  },
  {
    path: "/codemirror",
    meta: {
      title: "Markdown Editor",
    },
    icon: "Tickets",
  },
  {
    path: "/crud",
    meta: {
      title: "Table CRUD",
    },
    icon: "Tickets",
  },
  {
    path: "/form",
    meta: {
      title: "Form Validation",
    },
    icon: "Tickets",
  },
  {
    path: "/utilities",
    meta: {
      title: "Use Utilities",
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
        path: "/one",
        meta: {
          title: "1 - 1",
        },
      },
      {
        path: "/two",
        meta: {
          title: "1 - 2",
        },
        children: [
          {
            path: "/one",
            meta: {
              title: "1 - 2 - 1",
            },
          },
          {
            path: "/two",
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
