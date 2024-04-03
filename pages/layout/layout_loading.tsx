import React from "react";
import Loading from "./loading";

interface LayoutProps {
  isLoading: boolean;
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ isLoading }) => {
  return <div className="layout">{isLoading ? <Loading /> : <></>}</div>;
};

export default Layout;
