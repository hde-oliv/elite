import {
  Flex,
  Text,
  Box,
  Image,
  Center,
  Heading,
  VStack,
  Grid,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { getFilm } from "../../lib/Firebase";
import Head from "next/head";

export default function FilmPage({ film }) {
  return (
    <Flex flexDirection="column" height="100vh">
     <Head>
        <title>{film.title}</title>
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
          <Flex boxShadow="lg" p="6" rounded="md" borderRadius="md">
            {/* Image Box Start */}
            <Center flex="1">
              <Flex p="4%" pl="0%">
                <Link href={film.mal_url} passHref>
                  <Image
                    src={film.image}
                    cursor="pointer"
                    height="600px"
                    width="439px"
                    borderRadius="md"
                    shadow="xs"
                    maxHeight="600px"
                    maxWidth="439px"
                    alt={film.title}
                  />
                </Link>
              </Flex>
            </Center>
            {/* Image Box End */}
            {/* Text Box Start */}
            <Box flex="2" ml="5%" pt="1%">
              <VStack spacing="4%">
                <Heading >
                  {film.title}
                </Heading>
                <Text fontSize="md" textAlign="center">
                  {film.description}
                </Text>
                <Box>
                  {film.links.length !== 1 ? (
                    <Grid templateColumns="repeat(12, 1fr)" gap={6}>
                      {film.links.map((link, index) => (
                        <Button
                          key={index}
                          onClick={() => window.open(link, "_blank")}
                        >
                          {index + 1}
                        </Button>
                      ))}
                    </Grid>
                  ) : (
                    <Button
                      onClick={() => window.open(film.links[0], "_blank")}
                    >
                      Link
                    </Button>
                  )}
                </Box>
                <Box>
                  {film.torrents.length > 0 ? (
                    <Flex flexDirection="row">
                      {film.torrents
                        .filter((torrent) => torrent !== "")
                        .map((torrent, index) => (
                          <Button
                            key={index}
                            onClick={() => window.open(torrent, "_blank")}
                            mr="4%"
                          >
                            Torrent
                          </Button>
                        ))}
                    </Flex>
                  ) : (
                    <></>
                  )}
                </Box>
              </VStack>
            </Box>
          </Flex>
        </Box>
        {/* Text Box End */}
      </Box>
      <Footer />
    </Flex>
  );
}

export async function getServerSideProps({ params, res }) {
  const filmData = await getFilm(params.id);

  res.setHeader(
    'Cache-Control',
    'public, max-age=86400, stale-while-revalidate=1800'
  )

  return {
    props: { film: filmData },
  };
}
