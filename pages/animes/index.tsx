import { Flex } from "@chakra-ui/react";
import NavBar from "../../components/NavBar";
import { getAnimes } from "../../lib/Firebase";
import { useRouter } from "next/router";
import Footer from "../../components/Footer";
import AnimeGrid from "../../components/AnimeGrid";
import Head from "next/head";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

const AnimesPage = ({
  animeList,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  return (
    <Flex flexDirection="column" height="100vh">
      <Head>
        <title>Animes</title>
      </Head>
      <NavBar />
      <AnimeGrid animeList={animeList} router={router} />
      <Footer />
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const animeList = await getAnimes();

  context.res.setHeader(
    "Cache-Control",
    "public, max-age=86400, stale-while-revalidate=1800"
  );

  return {
    props: { animeList },
  };
};

export default AnimesPage;
