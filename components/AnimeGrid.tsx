import {
  Box,
  Button,
  Flex,
  SimpleGrid,
  Heading,
  Image,
  Container,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { NextRouter } from "next/router";
import Anime from "../models/Anime";

interface AnimeGridProps {
  animeList: Anime[];
  router: NextRouter;
}

interface AnimeItemProps {
  anime: Anime;
  router: NextRouter;
}

const AnimeItem = ({ anime, router }: AnimeItemProps) => {
  return (
    <Flex
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
      <Flex
        pr="3%"
        pl="3%"
        width="100%"
        flexDirection={{ base: "column", xl: "row" }}
      >
        <Container centerContent maxW="container.xl">
          <Image
            alt={anime.title}
            src={anime.image}
            height="275px"
            maxH="275px"
            minH="275px"
            width="187px"
            maxW="187px"
            minW="187px"
            borderRadius="md"
          />
        </Container>
        <Box
          width="100%"
          alignSelf="center"
          textAlign="center"
          pl={{ base: "0%", xl: "8%" }}
        >
          <Heading fontSize="3xl" mt={{ base: "4", xl: "0%" }}>
            {anime.title}
          </Heading>
          <Button
            size="sm"
            rightIcon={<ArrowForwardIcon />}
            colorScheme="blue"
            mt="5%"
            onClick={() => router.push(`/${anime.type}s/${anime.slug}`)}
          >
            Página
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};

const AnimeGrid = ({ animeList, router }: AnimeGridProps) => {
  return (
    <Box
      p="5%"
      pt="1%"
      pb="auto"
      justifyContent="end"
      border="px"
      borderColor="gray.100"
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} columnGap="5%">
        {animeList.map((anime, index) => (
          <AnimeItem anime={anime} router={router} key={index} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default AnimeGrid;
