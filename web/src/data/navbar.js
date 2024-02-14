export default [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Users",
    path: "/users",
    predicate: (role) => role === "ADMIN",
  },
];
