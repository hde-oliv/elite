import { Flex, Image, Box, Text, Button, Divider, Center, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";

export default function Home({ posts }) {
  const router = useRouter();

  return (
    <Flex flexDirection="column">
      <NavBar pd="auto"/>
      <Flex width="100vw">
        {/* Post Box Start */}
        <Flex flex="4" ml="5%">
          <Flex flexDirection="column" width="100%">
            {posts.map((post) => (
              <Flex p="5%" pt="2%" pb="3%" mb="4%" boxShadow="lg" rounded="md" borderRadius="md">
                <Center flexDirection="column">
                  <Image
                    maxWidth="480px"
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
                    <Button mr="2%" onClick={() => router.push(`/posts/${post.date}/${post.name}`)}>
                      Leia Mais
                    </Button>
                    <Button onClick={() => router.push(`/animes/${post.anime}`)}>
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

export async function getServerSideProps({ params }) {
    const request1 = await fetch(`http://localhost:3000/posts/mieruko-09.json`);
    const mieruko8 = await request1.json();
    const request2 = await fetch(`http://localhost:3000/posts/mieruko-08.json`)
    const mieruko9 = await request2.json();

    return {
        props: { posts: [ mieruko8, mieruko9, mieruko8, mieruko9, mieruko8 ] },
    }
}

