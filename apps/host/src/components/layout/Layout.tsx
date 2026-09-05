import { Suspense } from "react";
import { createUseStyles } from "react-jss";

import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { Outlet } from "react-router";
import Loading from "@/components/Loading";

export const Layout = () => {
  const classes = useStyles();

  return (
    <div className={classes.layout}>
      <Sidebar />
      <main className={classes.main}>
        <Topbar />
        <section className={classes.body}>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </section>
      </main>
    </div>
  );
};

const useStyles = createUseStyles({
  layout: {
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    color: "#111111",
    fontFamily: "Arial, sans-serif",
  },
  main: {
    width: "80%",
    marginLeft: "20%",
    minHeight: "100vh",
  },
  body: {
    padding: 20,
  },
});
