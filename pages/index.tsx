import {
  Flex,
  Box,
  Text,
  Button,
  Center,
  Heading,
  Divider,
  Image,
  Container,
  useToast,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Post from "../models/Post";
import Status from "../models/Status";
import { getPaginatedPosts, getStatus } from "../lib/Firebase";
import { useState } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

interface StatusBoxProps {
  statusList: Status[];
}

interface StatusItemProps {
  statusItem: Status;
}

interface PostBoxProps {
  postList: Post[];
  getNewPosts: React.MouseEventHandler<HTMLButtonElement>;
  showMorePosts: boolean;
  morePostsButtonIsLoading: boolean;
}

interface PostItemProps {
  postItem: Post;
}

interface SideBarProps {
  statusList: Status[];
}

const StatusItem = ({ statusItem }: StatusItemProps) => {
  const { title, next, status } = statusItem;

  return (
    <Box textAlign="left" pl={{ base: "0px", lg: "2%" }} pt="6%">
      <Heading size="sm">• {title}</Heading>
      <Text as="i" color="grey">
        {next} - {status}
      </Text>
    </Box>
  );
};

const StatusBox = ({ statusList }: StatusBoxProps) => {
  return (
    <Box
      boxShadow="lg"
      rounded="md"
      borderRadius="md"
      ml="1%"
      transition="box-shadow 0.2s"
      _hover={{
        boxShadow: "xl",
      }}
      width="100%"
      textAlign="center"
      p="6%"
    >
      <Heading size="md">Status dos Projetos</Heading>
      <Divider size="2px" pt="4%" />
      {statusList.length === 0 && (
        <Box pt="6%">
          <Heading as="i" color="grey" size="sm">
            {"Nenhum projeto sendo feito no momento!"}
          </Heading>
        </Box>
      )}
      {statusList.map((status, index) => (
        <StatusItem statusItem={status} key={index} />
      ))}
    </Box>
  );
};

const PostItem = ({ postItem }: PostItemProps) => {
  const { anime, author, date, image, preview_text, slug, title, type } =
    postItem;
  const router = useRouter();

  return (
    <Flex
      p="4%"
      pt={{ base: "6%", lg: "5%" }}
      pb={{ base: "4%", xl: "3%", "2xl": "3%" }}
      mb={{ base: "5%", lg: "3%" }}
      boxShadow="lg"
      rounded="md"
      transition="box-shadow 0.2s"
      _hover={{
        boxShadow: "2xl",
      }}
      borderRadius="md"
      flexDirection="column"
    >
      {/* Image, author and date */}
      <Center flexDirection="column">
        <Container
          centerContent
          maxW="container.xl"
          width={{ base: "100%", lg: "90%" }}
        >
          <Image
            width="100%"
            height="100%"
            boxSize="100%"
            src={image}
            alt={title}
            onClick={() => router.push(`/posts/${slug}`)}
            borderRadius="md"
            cursor="pointer"
          />
        </Container>
        <Divider width="45%" mt="2%" />
        <Text
          m="2%"
          mb="1%"
          fontSize={{ base: "sm", lg: "md" }}
          as="i"
          color="grey"
        >
          {author} - {date}
        </Text>
      </Center>
      {/* Title, preview text and buttons */}
      <Flex
        flexDirection="column"
        maxWidth="100%"
        maxHeight="100%"
        width="100%"
      >
        <Heading
          textAlign="center"
          fontSize={{ base: "3xl", md: "4xl", xl: "3xl", "2xl": "4xl" }}
          mb="3%"
        >
          {title}
        </Heading>
        <Container maxW="container.md" mb={{ base: "2%", lg: "0%" }}>
          <Text
            fontSize={{ base: "md", "2xl": "lg" }}
            maxHeight="100%"
            px={{ base: "1%", xl: "0%" }}
            textAlign="justify"
          >
            {preview_text}
          </Text>
        </Container>
        <Flex justifyContent="center" mt="3%" pb="1%" pr="1%" width="100%">
          <Button
            mr="2%"
            variant="outline"
            onClick={() => router.push(`/posts/${slug}`)}
          >
            Leia Mais
          </Button>
          <Button
            rightIcon={<ArrowForwardIcon />}
            colorScheme="blue"
            onClick={() => router.push(`/${type}s/${anime}`)}
          >
            Página do Anime
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

const PostBox = ({
  postList,
  getNewPosts,
  showMorePosts,
  morePostsButtonIsLoading,
}: PostBoxProps) => {
  return (
    <Flex
      flex="5"
      ml={{ base: "1%", lg: "5%" }}
      mr={{ base: "1%", lg: "0%" }}
      mb={{ base: "5%", lg: "0%" }}
    >
      <Flex flexDirection="column">
        {postList.map((post, index) => (
          <PostItem postItem={post} key={index} />
        ))}
        {showMorePosts && (
          <Button
            mb="1%"
            mt={{ base: "4%", lg: "0%" }}
            size="lg"
            alignSelf="center"
            isLoading={morePostsButtonIsLoading}
            onClick={getNewPosts}
          >
            Posts anteriores
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

const SideBar = ({ statusList }: SideBarProps) => {
  return (
    <Flex
      flex="2"
      pl="5%"
      pr="5%"
      mb={{ base: "5%", lg: "0%" }}
      flexDirection="column"
      justifyContent="space-between"
    >
      <Center alignSelf="start" width="100%">
        <StatusBox statusList={statusList} />
      </Center>
    </Flex>
  );
};

const HomePage = ({
  posts,
  status,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [actualPosts, setActualPosts] = useState(posts);
  const [actualPage, setActualPage] = useState(1);
  const [isEnabled, setIsEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const getNewPosts = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
      return;
    }
    setActualPage(actualPage + 1);
    setActualPosts(actualPosts.concat(newPosts));
    setIsLoading(false);
  };

  return (
    <Box maxW="100vw" mx="auto" px={{ base: 2, sm: 12, md: 17 }}>
      <NavBar />
      <Flex flexDirection={{ base: "column", lg: "row" }} pt="1%" pb="5%">
        <PostBox
          postList={actualPosts}
          getNewPosts={getNewPosts}
          showMorePosts={isEnabled}
          morePostsButtonIsLoading={isLoading}
        />
        <SideBar statusList={status} />
      </Flex>
      <Footer />
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const posts = await getPaginatedPosts(0);
  const statusList = await getStatus();

  context.res.setHeader(
    "Cache-Control",
    "public, max-age=1800, stale-while-revalidate=60"
  );
  return {
    props: { posts: posts, status: statusList },
  };
};

export default HomePage;
