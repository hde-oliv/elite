import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  Input,
  Select,
} from "@chakra-ui/react";
import { Field } from "formik";

interface FieldBoxProps {
  name: string;
  title: string;
  isRequired: boolean;
  placeholder: string;
}

interface SelectFieldBoxProps {
  name: string;
  title: string;
  list: string[];
  isRequired: boolean;
  placeholder: string;
}

export const FieldBox = ({
  name,
  title,
  isRequired,
  placeholder,
}: FieldBoxProps) => {
  return (
    <Field name={name}>
      {({ field, form }: any) => (
        <FormControl
          mt="1%"
          isRequired={isRequired}
          isInvalid={form.errors.name && form.touched.name}
        >
          <FormLabel htmlFor={name}>{title}</FormLabel>
          <Input {...field} id={name} placeholder={placeholder} />
          <FormErrorMessage>{form.errors.name}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export const TextareaFieldBox = ({
  name,
  title,
  isRequired,
  placeholder,
}: FieldBoxProps) => {
  return (
    <Field name={name}>
      {({ field, form }: any) => (
        <FormControl
          mt="1%"
          isRequired={isRequired}
          isInvalid={form.errors.name && form.touched.name}
        >
          <FormLabel htmlFor={name}>{title}</FormLabel>
          <Textarea {...field} id={name} placeholder={placeholder} />
          <FormErrorMessage>{form.errors.name}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export const SelectFieldBox = ({
  name,
  title,
  list,
  isRequired,
  placeholder,
}: SelectFieldBoxProps) => {
  return (
    <Field name={name}>
      {({ field, form }: any) => (
        <FormControl
          mt="1%"
          isRequired={isRequired}
          isInvalid={form.errors.name && form.touched.name}
        >
          <FormLabel htmlFor={name}>{title}</FormLabel>
          <Select {...field} id={name} placeholder={placeholder}>
            {list.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{form.errors.name}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};
