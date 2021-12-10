import { Flex, Text, Box, Image, Center, VStack, Grid, Button,} from "@chakra-ui/react";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import {getAnime} from "../../lib/Firebase";

export default function AnimePage({ anime }) {

  return (
    <Flex flexDirection="column" height="100vh">
      <NavBar pd="auto" justifyContent="start" />
      <Box
        p="5%"
        pt="2%"
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
                <Text fontSize="5xl" as="b">
                  {anime.title}
                </Text>
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
                      {anime.torrents.map((torrent, index) => (
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
                {/* Text Box End */}
              </VStack>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export async function getServerSideProps({ params }) {
    const animeData = await getAnime(params.id);

    return {
        props: { anime: animeData },
    }
}
