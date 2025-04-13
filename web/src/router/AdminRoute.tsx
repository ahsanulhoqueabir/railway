import Admin from "@/Pages/Admin";
import AdminOnly from "@/router/AdminOnly";
import ErrorPage from "@/Pages/ErrorPage";

const router = [
  {
    path: "/admin-panel",
    element: (
      <AdminOnly>
        <Admin />
      </AdminOnly>
    ),
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];

export default router;
