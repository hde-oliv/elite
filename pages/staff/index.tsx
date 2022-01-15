import {
  Flex,
  Center,
  Text,
  Box,
  Container,
  Image,
  SimpleGrid,
  Heading,
} from "@chakra-ui/react";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { getStaff } from "../../lib/Firebase";
import Head from "next/head";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Staff from "../../models/Staff";

interface StaffItemProps {
  staff: Staff;
}

const StaffItem = ({ staff }: StaffItemProps) => {
  return (
    <Flex
      boxShadow="lg"
      p="6"
      rounded="md"
      borderRadius="md"
      _hover={{
        boxShadow: "xl",
      }}
      mb="3%"
    >
      <Flex p="3%" width="100%" flexDirection={{ base: "column", lg: "row" }}>
        <Container maxW="container.sm">
          <Center justifyContent={{ base: "center", lg: "start" }}>
            <Image
              alt={staff.name}
              src={staff.image}
              maxWidth={{ base: "100px", lg: "150px" }}
              maxHeight={{ base: "100px", lg: "150px" }}
              borderRadius="md"
            />
          </Center>
        </Container>
        <Center
          flexDirection="column"
          mt={{ base: "4", lg: "0%" }}
          textAlign={{ base: "center", lg: "right" }}
        >
          <Heading fontSize={{ base: "2xl", lg: "3xl" }} width="100%">
            {staff.name}
          </Heading>
          <Text as="i" color="grey" width="100%">
            {staff.description}
          </Text>
        </Center>
      </Flex>
    </Flex>
  );
};

const StaffPage = ({
  staffList,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Box
      maxW="100vw"
      width="100%"
      mx="auto"
      px={{ base: 2, sm: 12, md: 17 }}
      pb="2%"
    >
      <Head>
        <title>Staff</title>
      </Head>
      <NavBar />
      <Flex flexDirection="column" pb={{ base: "60%", md: "5%" }}>
        <SimpleGrid
          p="5%"
          pt="1%"
          width="100%"
          justifyContent="end"
          columns={{ base: 1, md: 2 }}
          columnGap="5%"
          rowGap="2%"
        >
          {
            // @ts-ignore
            staffList.map((staff, index) => (
              <StaffItem key={index} staff={staff} />
            ))
          }
        </SimpleGrid>
      </Flex>
      <Footer />
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const staffList = await getStaff();
  context.res.setHeader(
    "Cache-Control",
    "public, max-age=604800, stale-while-revalidate=86400"
  );

  return {
    props: {
      staffList,
    },
  };
};

export default StaffPage;
