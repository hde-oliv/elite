import { getPost } from "../../lib/Firebase";
import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  Image,
  Button,
  Tooltip,
  Text,
  VStack,
} from "@chakra-ui/react";
import NavBar from "../../components/NavBar";
import { useRouter } from "next/router";
import Head from "next/head";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { MDXComponents } from "../../components/MDXComponents";
import Footer from "../../components/Footer";

export default function PostPage({ post }) {
  const router = useRouter();

  return (
    <Flex flexDirection="column" height="100vh">
      <Head>
        <title>{post.title}</title>
      </Head>
      <NavBar pd="auto" justifyContent="start" />
      <Box
        p="5%"
        pt="1%"
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
                <Tooltip label="Página do anime" placement="bottom-end">
                  <Image
                    src={post.image}
                    cursor="pointer"
                    borderRadius="md"
                    maxHeight="480px"
                    alt={post.title}
                    onClick={() => router.push(`/${post.type}s/${post.anime}`)}
                  />
                </Tooltip>
              </Flex>
            </Center>
            {/* Image Box End */}
            <Center flexDirection="column">
              <Divider size="3px" width="40%" />
              <Text as="i" color="gray" mb="1%" mt="1%">
                {post.author} - {post.date}
              </Text>
            </Center>
            {/* Text Box Start */}
            <Box flex="1" pb="2%">
              <VStack spacing="2%">
                <Heading>{post.title}</Heading>
                {/* <Text >
                  {post.text}
                </Text> */}
                <Box pr="4%" fontSize="lg" pl="4%">
                  <MDXRemote {...post.text} components={MDXComponents} />
                </Box>
              </VStack>
            </Box>
            <Center>
              <Button
                colorScheme="blue"
                onClick={() => router.push(`/${post.type}s/${post.anime}`)}
              >
                Página do Anime
              </Button>
            </Center>
          </Flex>
        </Box>
        {/* Text Box End */}
      </Box>
      <Footer />
    </Flex>
  );
}

export async function getServerSideProps({ params }) {
  const postData = await getPost(params.id);
  const mdxSource = await serialize(postData.text, {
    mdxOptions: {
      remarkPlugins: [remarkBreaks, remarkGfm],
    },
  });

  return {
    props: { post: { ...postData, text: mdxSource } },
  };
}
