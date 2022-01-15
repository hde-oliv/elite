import { Flex } from "@chakra-ui/react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { getSpecial } from "../../lib/Firebase";
import Head from "next/head";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import AnimeItem from "../../components/AnimeItem";

const SpecialPage = ({
  special,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Flex flexDirection="column" height="100vh" width="100%">
      <Head>
        <title>{special.title}</title>
      </Head>
      <NavBar />
      <Flex mb={{ base: "5%", lg: "4%" }}>
        <AnimeItem anime={special} />
      </Flex>
      <Flex flexDirection="column">
        <Footer />
      </Flex>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const special = await getSpecial(context.params?.id);

  context.res.setHeader(
    "Cache-Control",
    "public, max-age=86400, stale-while-revalidate=1800"
  );

  return {
    props: { special },
  };
};

export default SpecialPage;
