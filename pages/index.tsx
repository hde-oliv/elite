import {
  Flex,
  Box,
  Text,
  Button,
  Center,
  Heading,
  Divider,
  Image,
  useToast,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Post from "../models/Post";
import Status from "../models/Status";
import { getPaginatedPosts, getStatus } from "../lib/Firebase";
import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

interface StatusBoxProps {
  statusList: Status[];
}

interface StatusItemProps {
  statusItem: Status;
}

interface PostListProps {
  postList: Post[];
}

interface PostItemProps {
  postItem: Post;
}

interface SideBarProps {
  statusList: Status[];
  getNewPosts: React.MouseEventHandler<HTMLButtonElement>;
  showMorePosts: boolean;
}

const StatusItem = ({ statusItem }: StatusItemProps) => {
  const { title, next, status } = statusItem;

  return (
    <Box textAlign="left" pl="2%" pt="6%">
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
      pt="2%"
      pb="3%"
      mb="2%"
      boxShadow="lg"
      rounded="md"
      transition="box-shadow 0.2s"
      _hover={{
        boxShadow: "2xl",
      }}
      borderRadius="md"
    >
      <Center flexDirection="column">
        <Box width="480px" height="270px">
          <Image
            height="100%"
            width="100%"
            maxWidth="480px"
            maxHeight="270px"
            src={image}
            alt={title}
            onClick={() => router.push(`/posts/${slug}`)}
            borderRadius="md"
            cursor="pointer"
          />
        </Box>
        <Text mt="4%" as="i" color="grey">
          {author} - {date}
        </Text>
      </Center>
      <Flex
        ml="5%"
        flexDirection="column"
        maxWidth="100%"
        maxHeight="100%"
        width="100%"
        overflow="auto"
      >
        <Heading size="lg" textAlign="start" mb="4%">
          {title}
        </Heading>
        <Box maxHeight="100%" height="100%">
          <Text fontSize="lg" noOfLines={[1, 2, 3]} maxHeight="100%">
            {preview_text}
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

const PostBox = ({ postList }: PostListProps) => {
  return (
    <Flex flex="4" ml="5%">
      <Flex flexDirection="column" width="100%">
        {postList.map((post, index) => (
          <PostItem postItem={post} key={index} />
        ))}
      </Flex>
    </Flex>
  );
};

const SideBar = ({ statusList, getNewPosts, showMorePosts }: SideBarProps) => {
  return (
    <Flex
      flex="1"
      pl="5%"
      pr="5%"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Center alignSelf="start" width="100%">
        <StatusBox statusList={statusList} />
      </Center>
      {showMorePosts && (
        <Button mb="7%" onClick={getNewPosts}>
          Posts anteriores
        </Button>
      )}
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
  const toast = useToast();

  const getNewPosts = async () => {
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
      <Head>
        <title>elite fansub</title>
      </Head>
      <NavBar />
      <Flex pt="1%" pb="5%">
        <PostBox postList={actualPosts} />
        <SideBar
          statusList={status}
          getNewPosts={getNewPosts}
          showMorePosts={isEnabled}
        />
      </Flex>
      <Footer />
    </Flex>
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
