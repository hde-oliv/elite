import {
  Flex,
  Text,
  Box,
  Image,
  Grid,
  Heading,
} from "@chakra-ui/react";
import NavBar from "../../components/NavBar";

export default function StaffPage() {

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
      <NavBar />
      <Box
        p="5%"
        pt="2%"
        pb="auto"
        justifyContent="end"
        border="px"
        borderColor="gray.100"
      >
        <Box>
          <Grid templateColumns="repeat(2, 10fr)" columnGap="5%" rowGap="2%">
          {personList.map((person, index) => (
            <Flex key={index} boxShadow="lg" p="6" rounded="md" borderRadius="md" mb="3%">
              <Flex pr="3%" pl="3%" width="100%">
                <Image alt={person.name} src={person.image} maxWidth="150px" maxHeight="150px" />
                <Box width="100%" alignSelf="center" textAlign="right">
                  <Heading>{person.name}</Heading>
                  <Text as="i" color="grey">{person.description}</Text>
                </Box>
              </Flex>
            </Flex>
          ))}
          </Grid>
        </Box>
      </Box>
    </Flex>
  );
}
