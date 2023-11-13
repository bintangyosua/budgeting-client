import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import React from "react";
import classnames from "classnames";

export default function SelectItem({
  children,
  className,
  props,
  value,
}: {
  children: React.ReactNode;
  className?: string;
  value: string;
  props?: React.Attributes;
}) {
  return (
    <Select.Item
      className={classnames("SelectItem", className)}
      {...props}
      value={value}>
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="SelectItemIndicator">
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
}
