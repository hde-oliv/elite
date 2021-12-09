import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";

export default function Home() {
  const router = useRouter();

  return (
    <Flex flexDirection="column">
      <NavBar pd="auto" />
      <Flex>
        <Flex justifyContent="start" mr="auto">
          {/* Posts */}
        </Flex>
        <Flex justifyContent="end" ml="auto">
          {/* Sidebar */}
        </Flex>
      </Flex>
    </Flex>
  );
}
