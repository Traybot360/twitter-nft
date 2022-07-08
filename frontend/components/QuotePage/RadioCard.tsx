import { Box, useRadio } from "@chakra-ui/react";
import { ReactNode } from "react";
// component for a set of radio options
const RadioCard = (props: { children: ReactNode; radio: any }) => {
  const { getInputProps, getCheckboxProps } = useRadio(props.radio);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "blue.600",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default RadioCard;
