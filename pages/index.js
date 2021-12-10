import { Flex, Image, Box, Text, Button, Center, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";
import { ArrowForwardIcon } from "@chakra-ui/icons"
import { getPosts} from "../lib/Firebase";

export default function Home({ posts }) {
  const router = useRouter();

  console.log({posts})

  return (
    <Flex flexDirection="column">
      <NavBar pd="auto"/>
      <Flex width="99vw" pt="2%">
        {/* Post Box Start */}
        <Flex flex="4" ml="5%">
          <Flex flexDirection="column" width="100%">
            {posts.map((post, index) => (
              <Flex key={index} p="4%" pt="2%" pb="3%" mb="2%" boxShadow="lg" rounded="md" borderRadius="md">
                <Center flexDirection="column">
                  <Image
                    maxWidth="480px"
                    maxHeight="270px"
                    src={post.image}
                    alt={post.title}
                    borderRadius="md"
                  />
                <Text mt="4%" as="i" color="grey">{post.author} - {post.date}</Text>
                </Center>
                <Flex pl="5%" flexDirection="column" maxWidth="100%" maxHeight="100%">
                  <Heading textAlign="start" mb="5%">{post.title}</Heading>
                  <Text noOfLines={[1, 2, 3, 4, 5]} maxHeight="100%">{post.text}</Text>
                  <Flex justifyContent="end" justifySelf="end" mt="auto">
                    <Button mr="2%" variant="outline" onClick={() => router.push(`/posts/${post.date}/${post.title}`)}>
                      Leia Mais
                    </Button>
                    <Button rightIcon={<ArrowForwardIcon />} colorScheme='blue' onClick={() => router.push(`/animes/${post.anime}`)}>
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
        <Flex flex="1" justifyContent="center" mr="5%">
          <Box>
            {/* TODO: Add Sidebar */}
          </Box>
        </Flex>
        {/* Sidebar End */}
      </Flex>
    </Flex>
  );
}

export async function getServerSideProps() {
  const postList = await getPosts();
    return {
        props: { posts: postList },
    }
}

