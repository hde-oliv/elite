import { Flex } from "@chakra-ui/react";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { getFilm } from "../../lib/Firebase";
import Head from "next/head";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import AnimeItem from "../../components/AnimeItem";

const FilmPage = ({
  film,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Flex flexDirection="column" height="100vh" width="100%">
      <Head>
        <title>{film.title}</title>
      </Head>
      <NavBar />
      <Flex mb={{ base: "5%", lg: "4%" }}>
        <AnimeItem anime={film} />
      </Flex>
      <Flex flexDirection="column">
        <Footer />
      </Flex>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const film = await getFilm(context.params?.id);

  context.res.setHeader(
    "Cache-Control",
    "public, max-age=86400, stale-while-revalidate=1800"
  );

  return {
    props: { film },
  };
};

export default FilmPage;
