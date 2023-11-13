import { Input, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function InputField() {
  const [value, setValue] = useState("");
  const handleChange = (event: React.FormEvent<HTMLInputElement>) =>
    setValue(event.currentTarget.value);

  return <></>;
}
