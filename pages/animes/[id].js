import { Flex, Text, Box, Image, Center, VStack, Spacer, List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Button,} from "@chakra-ui/react";
import Link from "next/link";
import NavBar from "../../components/NavBar";

export default function AnimePage() {
  const pageProps = {
    title: "Tsugu Tsugumomo",
    description:
      "Um garoto tímido de 16 anos, Yuuki Rito, não consegue declarar seu amor por Sairenji Haruna – uma colega de classe e sua paixão desde o fundamental. Infelizmente, a situação se torna ainda mais catastrófica quando uma garota misteriosa e completamente nua aparece em sua banheira.",
    mal_url: "https://myanimelist.net/anime/39469/",
    image: "https://cdn.myanimelist.net/images/anime/1885/104633l.webp",
    image2: "https://i.imgur.com/1trZzqW.jpg",
    links: [
      "https://www.google.com",
      "https://www.facebook.com",
      "https://www.twitter.com",
    ],
  };

  // Change layout when mobile have less than 800px
  return (
    <Flex flexDirection="column" height="100vh">
      <NavBar pd="auto" justifyContent="start"/>
      <Box p="5%" pt="3%" pb="auto" justifyContent="end" border="px" borderColor="gray.100">
        <Box pt="2%" pb="2%">
          <Flex>
            {/* Image Box Start */}
            <Center flex="1">
              <Flex p="4%" pl="0%">
                <Link href={pageProps.mal_url}>
                  <Image src={pageProps.image} borderRadius="4"/>
                </Link>
              </Flex>
            </Center>
            {/* Image Box End */}
            {/* Text Box Start */}
            <Box flex="2" pt="1%">
              <VStack spacing="4%">
                <Text fontSize="5xl" as="b">
                  {pageProps.title}
                </Text>
                <Text fontSize="md" textAlign="center">
                  {pageProps.description}
                </Text>
                <Box>
                  <List>
                    {pageProps.links.map((link, index) => (
                      <ListItem
                        key={index}
                        onClick={() => window.open(link, "_blank")}
                      >
                        <Button>{index}</Button>
                      </ListItem>
                    ))}
                  </List>
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
