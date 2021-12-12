import {getPost} from "../../lib/Firebase";
import {Box, Button, Center, Divider, Flex, Grid, Heading, Image, Link, Text, VStack} from "@chakra-ui/react";
import NavBar from "../../components/NavBar";
import {useRouter} from "next/router";
import Head from 'next/head'
import { GetServerSideProps } from "next";
import Post from "../../types/Post";
import { InferGetServerSidePropsType } from 'next'

export default function PostPage({ post }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  return (
    <Flex flexDirection="column" height="100vh">
      <Head>
        <title>
          {post.title}
        </title>
      </Head>
      <NavBar />
      <Box
        p="5%"
        pt="2%"
        pb="auto"
        justifyContent="end"
        border="px"
        borderColor="gray.100"
      >
        <Box>
          <Flex boxShadow="lg" p="6" rounded="md" borderRadius="md" flexDirection="column">
            {/* Image Box Start */}
            <Center flex="1">
              <Flex p="4%" pb="2%" pt="2%">
                  <Image
                    src={post.image}
                    cursor="pointer"
                    maxHeight="480px"
                    alt={post.title}
                    onClick={() => router.push(`/animes/${post.anime}`)}
                  />
              </Flex>
            </Center>
            {/* Image Box End */}
            <Center>
              <Divider size="3px" width="40%" />
            </Center>
            {/* Text Box Start */}
            <Box flex="1" pt="1%" pb="2%">
              <VStack spacing="2%">
                <Heading>
                  {post.title}
                </Heading>
                <Text pr="4%" fontSize="lg" pl="4%">
                  {post.text}
                </Text>
              </VStack>
            </Box>
          </Flex>
        </Box>
        {/* Text Box End */}
      </Box>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  const postData = await getPost(id as string);

  return {
    props: { post: postData },
  };
}
