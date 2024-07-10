import Icon from "@ant-design/icons";
import { CollapseProps, GetProps, MenuProps, TableProps } from "antd";

export type MenuItem = Required<MenuProps>["items"][number];
export type CustomIconComponentProps = GetProps<typeof Icon>;
export type CollapseItem = Required<CollapseProps>["items"][number];
export type TableColumnItem<T = any> = Required<
	TableProps<T>
>["columns"][number];
