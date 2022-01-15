import {
  Flex,
  Container,
  Text,
  Box,
  Image,
  Center,
  Heading,
  Grid,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import Anime from "../models/Anime";

interface AnimeItemProps {
  anime: Anime;
}

interface LinksBoxProps {
  links: string[];
}

interface TorrentBoxProps {
  links: string[];
}

const TorrentBox = ({ links }: TorrentBoxProps) => {
  return (
    <Box mt="2%">
      {links.length > 0 ? (
        <Flex flexDirection="row">
          {links
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
  );
};

const LinksBox = ({ links }: LinksBoxProps) => {
  return (
    <Box>
      {links.length !== 1 ? (
        <Grid templateColumns="repeat(12, 1fr)" gap={6}>
          {links.map((link, index) => (
            <Button key={index} onClick={() => window.open(link, "_blank")}>
              {index + 1}
            </Button>
          ))}
        </Grid>
      ) : (
        <Button onClick={() => window.open(links[0], "_blank")}>Link</Button>
      )}
    </Box>
  );
};

const AnimeItem = ({ anime }: AnimeItemProps) => {
  return (
    <Box ml="5%" mr="5%">
      <Flex
        p="5%"
        mb="4%"
        justifyContent="end"
        border="px"
        borderColor="gray.100"
        boxShadow="lg"
        rounded="md"
        flexDirection={{ base: "column", lg: "row" }}
        borderRadius="md"
      >
        {/* Image */}
        <Center pr={{ base: "0%", md: "3%" }} flex="1">
          <Container
            centerContent
            maxW="container.xl"
            width="100%"
            height="100%"
          >
            <Link href={anime.mal_url} passHref>
              <Image
                src={anime.image}
                cursor="pointer"
                maxHeight="600px"
                maxWidth="439px"
                height={{ base: "375px", lg: "600px" }}
                width={{ base: "275px", lg: "439px" }}
                borderRadius="md"
                shadow="xs"
                alt={anime.title}
              />
            </Link>
          </Container>
        </Center>
        {/* Text and buttons */}
        <Box flex="2" mt={{ base: "2%", lg: "0%" }}>
          <Heading textAlign={{ base: "center", lg: "left" }} fontSize="4xl">
            {anime.title}
          </Heading>
          <Text
            fontSize="lg"
            pt="4%"
            textAlign={{ base: "justify", lg: "left" }}
          >
            {anime.description}
          </Text>
          <Center flexDirection="column" pt="4%">
            <LinksBox links={anime.links} />
            <TorrentBox links={anime.torrents} />
          </Center>
        </Box>
      </Flex>
    </Box>
  );
};

export default AnimeItem;
