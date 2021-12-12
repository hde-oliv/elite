import {Box, Button, Center, Divider, Flex, Grid, Heading, Image, Text} from "@chakra-ui/react";
import NavBar from "../../components/NavBar";
import {ArrowForwardIcon} from "@chakra-ui/icons";
import {getAnimes} from "../../lib/Firebase";
import {useRouter} from "next/router";
import { GetServerSideProps } from 'next'
import AnimeList from "../../types/AnimeList";
import Anime from "../../types/Anime";

export default function AnimesPage({ animes }: AnimeList) {
  const router = useRouter();

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
          <Grid templateColumns="repeat(3, 1fr)" columnGap="5%" rowGap="2%">
            {animes.map((anime, index) => (
              <Flex key={index} boxShadow="lg" p="6" rounded="md" borderRadius="md" mb="3%">
                <Flex pr="3%" pl="3%" width="100%">
                  <Image alt={anime.title} src={anime.image} maxHeight="250px" />
                  <Box width="100%" alignSelf="center" textAlign="center" pl="8%">
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
    </Flex>
  );
}



export const getServerSideProps: GetServerSideProps = async () => {
  const animesData: Anime[] = await getAnimes();

  return {
    props: { animes: animesData },
  };
}
