import { getPost } from "../../lib/Firebase";
import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  Image,
  Button,
  Text,
  VStack,
} from "@chakra-ui/react";
import NavBar from "../../components/NavBar";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Post({ post }) {
  const router = useRouter();

  return (
    <Flex flexDirection="column" height="100vh">
      <Head>
        <title>{post.title}</title>
      </Head>
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
          <Flex
            boxShadow="lg"
            p="6"
            rounded="md"
            borderRadius="md"
            flexDirection="column"
          >
            {/* Image Box Start */}
            <Center flex="1">
              <Flex p="4%" pb="2%" pt="2%">
                <Image
                  src={post.image}
                  cursor="pointer"
                  maxHeight="480px"
                  alt={post.title}
                  onClick={() => router.push(`/${post.type}s/${post.anime}`)}
                />
              </Flex>
            </Center>
            {/* Image Box End */}
            <Center flexDirection="column">
              <Divider size="3px" width="40%" />
              <Text as="i" color="gray" mb="1%" mt="1%">{post.author} - {post.date}</Text>
            </Center>
            {/* Text Box Start */}
            <Box flex="1" pb="2%">
              <VStack spacing="2%">
                <Heading>{post.title}</Heading>
                <Text pr="4%" fontSize="lg" pl="4%">
                  {post.text}
                </Text>
              </VStack>
            </Box>
            <Center>
            <Button colorScheme="blue" onClick={() => router.push(`/${post.type}s/${post.anime}`)}>
              Página do Anime
            </Button>
            </Center>
          </Flex>
        </Box>
        {/* Text Box End */}
      </Box>
    </Flex>
  );
}

export async function getServerSideProps({ params }) {
  const postData = await getPost(params.id);

  return {
    props: { post: postData },
  };
}
