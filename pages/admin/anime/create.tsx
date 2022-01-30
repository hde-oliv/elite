import { Box, Center, Flex, Heading, Text, Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useContext } from "react";
import { convertToSlug, handleToast } from "../../../lib/Utils";
import { setAnime } from "../../../lib/Firebase";
import { UserContext } from "../../../lib/UserContext";
import NavBar from "../../../components/NavBar";
import { Formik, Form, FormikHelpers } from "formik";
import {
  SelectFieldBox,
  FieldBox,
  TextareaFieldBox,
} from "../../../components/FieldBox";

const AnimeCreatePage = () => {
  const { user, isAdmin } = useContext(UserContext);

  return (
    <>
      {user && isAdmin ? (
        <Box
          maxW="100vw"
          width="100%"
          mx="auto"
          px={{ base: 2, sm: 12, md: 17 }}
        >
          <NavBar />
          <Flex flexDirection="column" p="5%" pt="1%" pb="auto">
            <Heading mt="2%" textAlign="left">
              Create Anime
            </Heading>
            <Text mb="1%">Logged as: {user.email}</Text>
            <AnimeCreateForm />
          </Flex>
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};

const handleSubmit = (values: AnimeFormValues) => {
  const slug = convertToSlug(values.title);
  let links;
  if (values.anitsu === "") {
    links = [values.drive];
  } else {
    links = [values.drive, values.anitsu];
  }
  const anime = {
    description: values.description,
    image: values.image,
    links: links,
    mal_url: values.mal_url,
    slug,
    type: values.type,
    torrents: [values.torrentOne, values.torrentTwo, values.torrentThree],
    title: values.title,
  };
  return setAnime(anime);
};

interface AnimeFormValues {
  description: string;
  image: string;
  drive: string;
  anitsu: string;
  mal_url: string;
  title: string;
  torrentOne: string;
  torrentTwo: string;
  torrentThree: string;
  type: string;
}

const AnimeCreateForm = () => {
  const toast = useToast();

  return (
    <>
      <Formik
        initialValues={{
          description: "",
          image: "",
          drive: "",
          anitsu: "",
          mal_url: "",
          title: "",
          torrentOne: "",
          torrentTwo: "",
          torrentThree: "",
          type: "",
        }}
        onSubmit={(
          values: AnimeFormValues,
          { setSubmitting, resetForm }: FormikHelpers<AnimeFormValues>
        ) => {
          setTimeout(() => {
            handleSubmit(values).then((res) => {
              handleToast(res, toast);
              if (res) {
                resetForm();
              }
            });
            setSubmitting(false);
          }, 500);
        }}
      >
        {(props) => (
          <Form>
            <FieldBox
              name={"title"}
              title="Title"
              isRequired={true}
              placeholder="Insert title"
            />
            <FieldBox
              name={"image"}
              title="Image Link"
              isRequired={true}
              placeholder="Insert image link, only 16:9 images"
            />
            <SelectFieldBox
              name={"type"}
              title="Anime Type"
              list={["anime", "film", "special"]}
              isRequired={true}
              placeholder="Select anime type"
            />
            <FieldBox
              name="drive"
              title="Drive Link"
              isRequired={true}
              placeholder="Insert drive link"
            />
            <FieldBox
              name="anitsu"
              title="Anitsu Link"
              isRequired={false}
              placeholder="Insert Anitsu link"
            />
            <FieldBox
              name="torrentOne"
              title="Torrent"
              isRequired={false}
              placeholder="Insert first torrent link"
            />
            <FieldBox
              name="torrentTwo"
              title="Torrent Two"
              isRequired={false}
              placeholder="Insert second torrent link"
            />
            <FieldBox
              name="torrentThree"
              title="Torrent Three"
              isRequired={false}
              placeholder="Insert third torrent link"
            />
            <FieldBox
              name="mal_url"
              title="MAL Link"
              isRequired={true}
              placeholder="Insert MAL link"
            />
            <TextareaFieldBox
              name="description"
              title="Description"
              isRequired={true}
              placeholder="Insert anime description"
            />
            <Center mt="4%" mb="2%" width="100%">
              <Button colorScheme="red" type="reset" mr="5%">
                Cancel
              </Button>
              <Button
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </Center>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AnimeCreatePage;
