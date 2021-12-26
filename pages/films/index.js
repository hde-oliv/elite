import { Box, Button, Flex, Grid, Heading, Image } from "@chakra-ui/react";
import NavBar from "../../components/NavBar";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { getFilms } from "../../lib/Firebase";
import { useRouter } from "next/router";
import Footer from "../../components/Footer";
import Head from "next/head";

export default function FilmsPage({ filmList }) {
  const router = useRouter();

  return (
    <Flex flexDirection="column" height="100vh">
      <Head>
        <title>Filmes</title>
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
            {filmList.map((film, index) => (
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
                    alt={film.title}
                    src={film.image}
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
                    <Heading fontSize="3xl">{film.title}</Heading>
                    <Button
                      size="sm"
                      rightIcon={<ArrowForwardIcon />}
                      colorScheme="blue"
                      mt="5%"
                      onClick={() => router.push(`/films/${film.slug}`)}
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

export async function getServerSideProps({ res }) {
  const filmsData = await getFilms();

  res.setHeader(
    'Cache-Control',
    'public, max-age=86400, stale-while-revalidate=1800'
  )
  
  return {
    props: { filmList: filmsData },
  };
}
