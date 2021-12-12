import {
  Flex,
  Image,
  Box,
  Text,
  Button,
  Center,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { getPosts, getStatus } from "../lib/Firebase";

export default function Home({ posts, status }) {
  const router = useRouter();

  return (
    <Flex flexDirection="column">
      <NavBar pd="auto" />
      <Flex pt="2%">
        {/* Post Box Start */}
        <Flex flex="4" ml="5%">
          <Flex flexDirection="column" width="100%">
            {posts.map((post, index) => (
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
                >
                  <Heading textAlign="start" mb="4%">
                    {post.title}
                  </Heading>
                  <Text noOfLines={[1, 2, 3, 4, 5, 6, 7, 8, 9]} maxHeight="100%" height="100%">
                    {post.text}
                  </Text>
                  <Flex justifyContent="end" justifySelf="end" mt="3%" width="100%">
                    <Button
                      mr="2%"
                      variant="outline"
                      onClick={() =>
                        router.push(`/posts/${post.slug}`)
                      }
                    >
                      Leia Mais
                    </Button>
                    <Button
                      rightIcon={<ArrowForwardIcon />}
                      colorScheme="blue"
                      onClick={() => router.push(`/animes/${post.anime}`)}
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
        <Flex flex="1" justifyContent="end" pl="5%" pr="5%">
          <Center flexDirection="column" justifyContent="start" width="100%">
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
        </Flex>
        {/* Sidebar End */}
      </Flex>
    </Flex>
  );
}

export async function getServerSideProps() {
  const postList = await getPosts();
  const statusList = await getStatus();

  return {
    props: { posts: postList, status: statusList },
  };
}
