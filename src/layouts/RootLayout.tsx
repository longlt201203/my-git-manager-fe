import { ConfigProvider } from "antd";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <ConfigProvider theme={{}}>
      <Outlet />
    </ConfigProvider>
  );
}
