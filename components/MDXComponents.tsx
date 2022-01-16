import {
  Link,
  ListItem,
  OrderedList,
  Text,
  chakra,
  UnorderedList,
} from "@chakra-ui/react";

const HeadingH1 = chakra("h1", {
  baseStyle: {
    fontFamily: "heading",
    fontWeight: "bold",
    fontSize: "3xl",
  },
});

const HeadingH2 = chakra("h2", {
  baseStyle: {
    fontFamily: "heading",
    fontWeight: "bold",
    fontSize: "2xl",
  },
});

const HeadingH3 = chakra("h3", {
  baseStyle: {
    fontFamily: "heading",
    fontWeight: "bold",
    fontSize: "xl",
  },
});

const HeadingH4 = chakra("h4", {
  baseStyle: {
    fontFamily: "heading",
    fontWeight: "bold",
    fontSize: "lg",
  },
});

const HeadingH5 = chakra("h5", {
  baseStyle: {
    fontFamily: "heading",
    fontWeight: "bold",
    fontSize: "md",
  },
});

const HeadingH6 = chakra("h6", {
  baseStyle: {
    fontFamily: "heading",
    fontWeight: "bold",
    fontSize: "sm",
  },
});

export const MDXComponents = {
  h1: HeadingH1,
  h2: HeadingH2,
  h3: HeadingH3,
  h4: HeadingH4,
  h5: HeadingH5,
  h6: HeadingH6,
  p: Text,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  a: Link,
};
