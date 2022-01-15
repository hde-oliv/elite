import { Flex } from "@chakra-ui/react";
import NavBar from "../../components/NavBar";
import { getFilms } from "../../lib/Firebase";
import { useRouter } from "next/router";
import Footer from "../../components/Footer";
import AnimeGrid from "../../components/AnimeGrid";
import Head from "next/head";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

const FilmsPage = ({
  filmList,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  return (
    <Flex flexDirection="column" height="100vh">
      <Head>
        <title>Filmes</title>
      </Head>
      <NavBar />
      <AnimeGrid animeList={filmList} router={router} />
      <Footer />
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const filmsData = await getFilms();

  context.res.setHeader(
    "Cache-Control",
    "public, max-age=86400, stale-while-revalidate=1800"
  );

  return {
    props: { filmList: filmsData },
  };
};

export default FilmsPage;
