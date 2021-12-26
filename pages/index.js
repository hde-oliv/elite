import {
  Flex,
  Image,
  Box,
  Text,
  Button,
  Center,
  Heading,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { getPaginatedPosts, getStatus } from "../lib/Firebase";
import Footer from "../components/Footer";

export default function Home({ posts, status }) {
  const router = useRouter();
  const [actualPosts, setActualPosts] = useState(posts);
  const [actualPage, setActualPage] = useState(1);
  const toast = useToast();
  const [isEnabled, setIsEnabled] = useState(true);

  const handleMorePosts = async () => {
    const newPosts = await getPaginatedPosts(actualPage);
    if (newPosts.length === 0) {
      toast({
        title: "Acabaram os posts",
        description: "Volte mais tarde!",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      setIsEnabled(false);
      return;
    }
    setActualPage(actualPage + 1);
    setActualPosts(actualPosts.concat(newPosts));
  };

  return (
    <Flex flexDirection="column">
      <NavBar pd="auto" />
      <Flex pt="1%" pb="5%">
        {/* Post Box Start */}
        <Flex flex="4" ml="5%">
          <Flex flexDirection="column" width="100%">
            {actualPosts.map((post, index) => (
              <Flex
                key={index}
                p="4%"
                pt="2%"
                pb="3%"
                mb="2%"
                boxShadow="lg"
                rounded="md"
                borderRadius="md"
              >
                <Center flexDirection="column">
                  <Image
                    maxWidth="480px"
                    maxHeight="270px"
                    src={post.image}
                    alt={post.title}
                    borderRadius="md"
                  />
                  <Text mt="4%" as="i" color="grey">
                    {post.author} - {post.date}
                  </Text>
                </Center>
                <Flex
                  pl="5%"
                  flexDirection="column"
                  maxWidth="100%"
                  maxHeight="100%"
                  width="100%"
                  overflow="auto"
                >
                  <Heading textAlign="start" mb="4%">
                    {post.title}
                  </Heading>
                  <Box maxHeight="100%" height="100%">
                    <Text fontSize="lg" noOfLines={[1, 2, 3]} maxHeight="100%">
                      {post.preview_text}
                    </Text>
                  </Box>
                  <Flex
                    justifyContent="end"
                    justifySelf="end"
                    mt="3%"
                    pb="1%"
                    pr="1%"
                    width="100%"
                  >
                    <Button
                      mr="2%"
                      variant="outline"
                      onClick={() => router.push(`/posts/${post.slug}`)}
                    >
                      Leia Mais
                    </Button>
                    <Button
                      rightIcon={<ArrowForwardIcon />}
                      colorScheme="blue"
                      onClick={() =>
                        router.push(`/${post.type}s/${post.anime}`)
                      }
                    >
                      Página do Anime
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            ))}
          </Flex>
        </Flex>
        {/* Post Box End */}
        {/* Sidebar Start */}
        <Flex
          flex="1"
          pl="5%"
          pr="5%"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Center alignSelf="start" width="100%">
            {/* Project Status Start */}
            <Box
              boxShadow="lg"
              rounded="md"
              borderRadius="md"
              ml="1%"
              width="100%"
              textAlign="center"
              p="6%"
            >
              <Heading size="md">Status dos Projetos</Heading>
              <Divider size="2px" pt="4%" />
              {status.length === 0 && (
                <Box pt="6%">
                  <Heading as="i" color="grey" size="sm">
                    {"Nenhum projeto sendo feito no momento!"}
                  </Heading>
                </Box>
              )}
              {status.map((status, index) => (
                <Box key={index} textAlign="left" pl="2%" pt="6%">
                  <Heading size="sm">• {status.title}</Heading>
                  <Text as="i" color="grey">
                    {status.next} - {status.status}
                  </Text>
                </Box>
              ))}
            </Box>
            {/* Project Status End */}
          </Center>
          {isEnabled && (
            <Button mb="7%" onClick={handleMorePosts}>
              Posts anteriores
            </Button>
          )}
        </Flex>
        {/* Sidebar End */}
      </Flex>
      <Footer />
    </Flex>
  );
}

export async function getServerSideProps() {
  const posts = await getPaginatedPosts(0);
  const statusList = await getStatus();

  return {
    props: { posts: posts, status: statusList },
  };
}
