import {
  Flex,
  Text,
  Box,
  Image,
  Center,
  VStack,
  Heading,
  Grid,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import { getAnime } from "../../lib/Firebase";
import Footer from "../../components/Footer";
import Head from "next/head";

export default function AnimePage({ anime }) {
  return (
    <Flex flexDirection="column" height="100vh">
      <Head>
        <title>{anime.title}</title>
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
                <Link href={anime.mal_url} passHref>
                  <Image
                    src={anime.image}
                    cursor="pointer"
                    height="600px"
                    width="439px"
                    borderRadius="md"
                    shadow="xs"
                    maxHeight="600px"
                    maxWidth="439px"
                    alt={anime.title}
                  />
                </Link>
              </Flex>
            </Center>
            {/* Image Box End */}
            {/* Text Box Start */}
            <Box flex="2" pt="1%">
              <VStack spacing="4%">
                                <Heading >
                  {anime.title}
                </Heading>
                <Text fontSize="md" textAlign="center">
                  {anime.description}
                </Text>
                <Box>
                  {anime.links.length !== 1 ? (
                    <Grid templateColumns="repeat(12, 1fr)" gap={6}>
                      {anime.links.map((link, index) => (
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
                      onClick={() => window.open(anime.links[0], "_blank")}
                    >
                      Link
                    </Button>
                  )}
                </Box>
                <Box>
                  {anime.torrents.length > 0 ? (
                    <Flex flexDirection="row">
                      {anime.torrents
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
  const animeData = await getAnime(params.id);

  res.setHeader(
    'Cache-Control',
    'public, max-age=86400, stale-while-revalidate=1800'
  )
  return {
    props: { anime: animeData },
  };
}
