import { Meta, Links, Outlet, LiveReload, Scripts } from "@remix-run/react";

export default function Root() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <Scripts />
        {/* <LiveReload /> */}
      </body>
    </html>
  );
}
