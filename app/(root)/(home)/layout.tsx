import LeftSideBar from "@/components/shared/leftsidebar/LeftSideBar";
import NavBar from "@/components/shared/navbar/NavBar";
import React, { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className="background-light850_dark100 relative">
      <NavBar />
      <div className="flex">
        <LeftSideBar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36">
          <div className="mx-auto">{children}</div>
        </section>
        RightSideBar
      </div>
    </main>
  );
};

export default Layout;
