import {
  Flex,
  Text,
  Box,
  Image,
  Heading,
  Center,
  VStack,
  Grid,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import { getAnime } from "../../lib/Firebase";

export default function staff() {

  const person = {
    name: "sakuta_arrls",
    image: "https://i1.wp.com/elite.fansubs.com.br/wp-content/uploads/2020/03/circle-cropped.png?w=676&ssl=1",
    description: "I am a staff member"
  }

  const personList = [
    person, person, person, person, person
  ]
  return (
    <Flex flexDirection="column" height="100vh">
      <NavBar pd="auto" justifyContent="start" />
      <Box
        p="25%"
        pt="2%"
        pb="auto"
        justifyContent="end"
        border="px"
        borderColor="gray.100"
      >
        <Box>
          {personList.map((person, index) => (
            <Flex key={index} boxShadow="lg" p="6" rounded="md" borderRadius="md" mb="3%">
              <Box pr="3%" pl="3%">
                <Image src={person.image} maxWidth="150px" maxHeight="150px" />
                <Heading>{person.name}</Heading>
                <Text>{person.description}</Text>
              </Box>
            </Flex>
          ))}
        </Box>
      </Box>
    </Flex>
  );
}
