import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  Textarea,
  Center,
  Input,
  Flex,
  Heading,
  Text,
  Select,
  Button,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useContext } from "react";
import { convertToSlug, handleToast } from "../../../lib/Utils";
import { setAnime } from "../../../lib/Firebase";
import { UserContext } from "../../../lib/UserContext";
import NavBar from "../../../components/NavBar";
import { Formik, Field, Form, FormikHelpers } from "formik";

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

interface GenerateFieldBoxProps {
  name: string;
  title: string;
  isRequired: boolean;
  placeholder: string;
}

const GenerateFieldBox = ({
  name,
  title,
  isRequired,
  placeholder,
}: GenerateFieldBoxProps) => {
  return (
    <Field name={name}>
      {({ field, form }: any) => (
        <FormControl
          mt="1%"
          isRequired={isRequired}
          isInvalid={form.errors.name && form.touched.name}
        >
          <FormLabel htmlFor={name}>{title}</FormLabel>
          <Input {...field} id={name} placeholder={placeholder} />
          <FormErrorMessage>{form.errors.name}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

const GenerateTextareaFieldBox = ({
  name,
  title,
  isRequired,
  placeholder,
}: GenerateFieldBoxProps) => {
  return (
    <Field name={name}>
      {({ field, form }: any) => (
        <FormControl
          mt="1%"
          isRequired={isRequired}
          isInvalid={form.errors.name && form.touched.name}
        >
          <FormLabel htmlFor={name}>{title}</FormLabel>
          <Textarea {...field} id={name} placeholder={placeholder} />
          <FormErrorMessage>{form.errors.name}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

const GenerateSelectFieldBox = ({
  name,
  title,
  isRequired,
  placeholder,
}: GenerateFieldBoxProps) => {
  return (
    <Field name={name}>
      {({ field, form }: any) => (
        <FormControl
          mt="1%"
          isRequired={isRequired}
          isInvalid={form.errors.name && form.touched.name}
        >
          <FormLabel htmlFor={name}>{title}</FormLabel>
          <Select {...field} id={name} placeholder={placeholder}>
            <option value="anime">Anime</option>
            <option value="film">Film</option>
            <option value="special">Special</option>
          </Select>
          <FormErrorMessage>{form.errors.name}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

const handleSubmit = (values: AnimeFormValues) => {
  const slug = convertToSlug(values.title);
  const anime = {
    description: values.description,
    image: values.image,
    links: [values.folder],
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
  folder: string;
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
          folder: "",
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
            {GenerateFieldBox({
              name: "title",
              title: "Title",
              isRequired: true,
              placeholder: "Insert title",
            })}
            {GenerateFieldBox({
              name: "image",
              title: "Image Link",
              isRequired: true,
              placeholder: "Insert image link, only 16:9 images",
            })}
            {GenerateSelectFieldBox({
              name: "type",
              title: "Anime Type",
              isRequired: true,
              placeholder: "Select anime type",
            })}
            {GenerateFieldBox({
              name: "folder",
              title: "Folder Link",
              isRequired: true,
              placeholder: "Insert folder link",
            })}
            {GenerateFieldBox({
              name: "torrentOne",
              title: "Torrent",
              isRequired: false,
              placeholder: "Insert first torrent link",
            })}
            {GenerateFieldBox({
              name: "torrentTwo",
              title: "Torrent Two",
              isRequired: false,
              placeholder: "Insert second torrent link",
            })}
            {GenerateFieldBox({
              name: "torrentThree",
              title: "Torrent Three",
              isRequired: false,
              placeholder: "Insert third torrent link",
            })}
            {GenerateFieldBox({
              name: "mal_url",
              title: "MAL Link",
              isRequired: true,
              placeholder: "Insert MAL link",
            })}
            {GenerateTextareaFieldBox({
              name: "description",
              title: "Description",
              isRequired: true,
              placeholder: "Insert anime description",
            })}
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
