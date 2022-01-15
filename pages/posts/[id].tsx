import { getPost } from "../../lib/Firebase";
import {
  Box,
  Center,
  Divider,
  Container,
  Flex,
  Heading,
  Image,
  Button,
  Tooltip,
  Text,
} from "@chakra-ui/react";
import NavBar from "../../components/NavBar";
import { NextRouter, useRouter } from "next/router";
import Head from "next/head";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { MDXComponents } from "../../components/MDXComponents";
import Footer from "../../components/Footer";
import Post from "../../models/Post";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

interface PostItemProps {
  post: Post;
  router: NextRouter;
}

const PostItem = ({ post, router }: PostItemProps) => {
  return (
    <Flex
      ml={{ base: "0%", lg: "5%" }}
      mr={{ base: "0%", lg: "0%" }}
      mb={{ base: "5%", lg: "0%" }}
      p={{ base: "4%", lg: "5%" }}
      pt={{ base: "6%", lg: "1%" }}
      pb={{ base: "4", lg: "1%" }}
      boxShadow="lg"
      rounded="md"
      borderRadius="md"
      flexDirection="column"
      width="100%"
    >
      {/* Image, author and date */}
      <Center
        flexDirection="column"
        pr={{ base: "0%", lg: "4%" }}
        pl={{ base: "0%", lg: "4%" }}
        pb={{ base: "0%", xl: "2%", "2xl": "1%" }}
        mb={{ base: "1%", lg: "3%" }}
        flex="1"
      >
        <Container
          centerContent
          maxW="container.xl"
          width={{ base: "100%", lg: "100%" }}
        >
          <Tooltip label="Página do anime" placement="bottom">
            <Image
              src={post.image}
              cursor="pointer"
              borderRadius="md"
              width="100%"
              height="100%"
              boxSize="100%"
              alt={post.title}
              onClick={() => router.push(`/${post.type}s/${post.anime}`)}
            />
          </Tooltip>
        </Container>
        <Divider mt="2%" size="3px" width="70%" />
        <Text
          as="i"
          color="gray"
          fontSize={{ base: "sm", lg: "md" }}
          mb="0%"
          m="2%"
        >
          {post.author} - {post.date}
        </Text>
      </Center>
      {/* Title, text and buttons */}
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        flex="1"
        pb="2%"
      >
        <Heading
          mb="3%"
          mx="1%"
          textAlign="center"
          fontSize={{ base: "3xl", md: "5xl", xl: "4xl", "2xl": "5xl" }}
        >
          {post.title}
        </Heading>
        <Container
          centerContent
          maxW={{ base: "container.md", lg: "container.lg" }}
          textAlign="justify"
          fontSize={{ base: "md", "2xl": "lg" }}
        >
          <Text> {post.text} </Text>
        </Container>
        <Center mt={{ base: "6%", lg: "2%" }}>
          <Button
            colorScheme="blue"
            onClick={() => router.push(`/${post.type}s/${post.anime}`)}
          >
            Página do Anime
          </Button>
        </Center>
      </Flex>
    </Flex>
  );
};

const PostPage = ({
  post,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  return (
    <Box width="100%" maxW="100%" mx="auto" px={{ base: 3, sm: 12, md: 17 }}>
      <Head>
        <title>{post.title}</title>
      </Head>
      <NavBar />
      <Flex pt="1%" pb="5%">
        <PostItem post={post} router={router} />
      </Flex>
      <Footer />
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const post = await getPost(context.params?.id);

  context.res.setHeader(
    "Cache-Control",
    "public, max-age=3600, stale-while-revalidate=1800"
  );

  return {
    props: { post },
  };
};

export default PostPage;
