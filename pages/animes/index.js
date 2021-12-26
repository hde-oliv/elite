import { Box, Button, Flex, Grid, Heading, Image } from "@chakra-ui/react";
import NavBar from "../../components/NavBar";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { getAnimes } from "../../lib/Firebase";
import { useRouter } from "next/router";
import Footer from "../../components/Footer";
import Head from "next/head";

export default function AnimesPage({ animeList }) {
  const router = useRouter();

  return (
    <Flex flexDirection="column" height="100vh">
      <Head>
        <title>Animes</title>
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
          <Grid templateColumns="repeat(2, 1fr)" columnGap="5%">
            {animeList.map((anime, index) => (
              <Flex
                key={index}
                boxShadow="lg"
                p="6"
                rounded="md"
                borderRadius="md"
                mb="3%"
                transition="box-shadow 0.2s"
                _hover={{
                  boxShadow: "2xl",
                }}
              >
                <Flex pr="3%" pl="3%" width="100%">
                  <Image
                    alt={anime.title}
                    src={anime.image}
                    height="250px"
                    width="170px"
                    maxHeight="250px"
                    maxWidth="170px"
                    borderRadius="md"
                    shadow="xs"
                  />
                  <Box
                    width="100%"
                    alignSelf="center"
                    textAlign="center"
                    pl="8%"
                  >
                    <Heading fontSize="3xl">{anime.title}</Heading>
                    <Button
                      size="sm"
                      rightIcon={<ArrowForwardIcon />}
                      colorScheme="blue"
                      mt="5%"
                      onClick={() => router.push(`/animes/${anime.slug}`)}
                    >
                      Página
                    </Button>
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
  const animesData = await getAnimes();

  return {
    props: { animeList: animesData },
  };
}
