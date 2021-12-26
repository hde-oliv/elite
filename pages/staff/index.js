import { Flex, Text, Box, Image, Grid, Heading } from "@chakra-ui/react";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { getStaff } from "../../lib/Firebase";
import Head from "next/head";

export default function StaffPage({ staff }) {
  return (
    <Flex flexDirection="column" height="100vh">
      <Head>
        <title>Staff</title>
      </Head>
      <NavBar pd="auto" justifyContent="start" />
      <Box
        p="5%"
        pt="1%"
        pb="auto"
        justifyContent="end"
        border="px"
        borderColor="gray.100"
      >
        <Box>
          <Grid templateColumns="repeat(2, 10fr)" columnGap="5%" rowGap="2%">
            {staff.map((person, index) => (
              <Flex
                key={index}
                boxShadow="lg"
                p="6"
                rounded="md"
                borderRadius="md"
                mb="3%"
              >
                <Flex pr="3%" pl="3%" width="100%">
                  <Image
                    alt={person.name}
                    src={person.image}
                    maxWidth="150px"
                    maxHeight="150px"
                    borderRadius="md"
                  />
                  <Box width="100%" alignSelf="center" textAlign="right">
                    <Heading>{person.name}</Heading>
                    <Text as="i" color="grey">
                      {person.description}
                    </Text>
                  </Box>
                </Flex>
              </Flex>
            ))}
          </Grid>
        </Box>
      </Box>
      <Footer />
    </Flex>
  );
}

export async function getServerSideProps() {
  const staff = await getStaff();

  return {
    props: {
      staff: staff,
    },
  };
}
