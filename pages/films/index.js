import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
} from "@chakra-ui/react";
import NavBar from "../../components/NavBar";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { getFilms } from "../../lib/Firebase";
import { useRouter } from "next/router";

export default function Films({ filmList }) {
  const router = useRouter();

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
          <Grid templateColumns="repeat(2, 1fr)" columnGap="5%" rowGap="2%">
            {filmList.map((film, index) => (
              <Flex
                key={index}
                boxShadow="lg"
                p="6"
                rounded="md"
                borderRadius="md"
                mb="3%"
              >
                <Flex pr="3%" pl="3%" width="100%">
                  <Image alt={film.title} src={film.image} maxHeight="250px" />
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
    </Flex>
  );
}

export async function getServerSideProps() {
  const filmsData = await getFilms();

  return {
    props: { filmList: filmsData },
  };
}
