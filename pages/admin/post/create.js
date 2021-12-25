import {
  FormControl,
  FormLabel,
  Textarea,
  VStack,
  Center,
  Input,
  Flex,
  Box,
  Heading,
  Text,
  Select,
  Button,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { convertToSlug } from "../../../lib/Utils";
import {
  setPost,
  getStaff,
  getAnimes,
  getFilms,
  getSpecials,
} from "../../../lib/Firebase";
import { UserContext } from "../../../lib/UserContext";
import NavBar from "../../../components/NavBar";

export default function CreatePostPage({ staff, titles }) {
  const { user, isAdmin } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [text, setText] = useState("");
  const [type, setType] = useState("");
  const [anime, setAnime] = useState("");
  const [preview_text, setPreviewText] = useState("");
  const [author, setAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleImageChange = (event) => setImage(event.target.value);
  const handleTextChange = (event) => setText(event.target.value);
  const handlePreviewTextChange = (event) => setPreviewText(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (
      title === "" ||
      image === "" ||
      author === "" ||
      anime === "" ||
      text === "" ||
      type === "" ||
      preview_text === ""
    ) {
      toast({
        title: `A field is missing`,
        status: "error",
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }
    const slug = convertToSlug(title);
    const post = {
      title,
      slug,
      image,
      text,
      type,
      preview_text,
      author,
      anime,
    };
    console.log(post);
    setPost(post).then((res) => {
      setIsLoading(false);
      if (res) {
        toast({
          title: `Post updated`,
          status: "success",
          isClosable: true,
        });
        setImage("");
        setText("");
        setTitle("");
      } else {
        toast({
          title: `Error`,
          status: "error",
          isClosable: true,
        });
      }
    });
  };

  return (
    <>
      {user && isAdmin ? (
        <Flex flexDirection="column" height="100vh">
          <NavBar pd="auto" justifyContent="start" />
          <Box
            p="5%"
            pt="1%"
            justifyContent="end"
            border="px"
            borderColor="gray.100"
          >
            <Box>
              <Flex boxShadow="lg" p="6" pb="1" rounded="md" borderRadius="md">
                <Flex flexDirection="column" height="100%" width="100%">
                  <Center pr="5%" pl="5%">
                    <Heading mr="auto"> Create Post</Heading>
                    <Text> Logged as: {user.email}</Text>
                  </Center>
                  <Box
                    p="5%"
                    pb="2%"
                    pt="2%"
                    justifyContent="end"
                    border="px"
                    borderColor="gray.100"
                  >
                    <VStack spacing="1.5%">
                      <FormControl id="title" isRequired>
                        <FormLabel>Title</FormLabel>
                        <Input
                          placeholder="Insert title"
                          value={title}
                          onChange={handleTitleChange}
                        />
                      </FormControl>
                      <FormControl id="image" isRequired>
                        <FormLabel>Image</FormLabel>
                        <Input
                          placeholder="Insert image link (only images that are 16:9, for fuck sake)"
                          value={image}
                          onChange={handleImageChange}
                        />
                      </FormControl>
                      <FormControl id="author" isRequired>
                        <FormLabel>Author</FormLabel>
                        <Select
                          placeholder="Select author"
                          onChange={(event) => {
                            const { target } = event;
                            setAuthor(
                              target[target.options.selectedIndex].value
                            );
                          }}
                        >
                          {staff.map((staff, index) => (
                            <option key={index} value={staff.name}>
                              {staff.name}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl id="anime" isRequired>
                        <FormLabel>Anime</FormLabel>
                        <Select
                          placeholder="Select anime"
                          onChange={(event) => {
                            const { target } = event;
                            setAnime(
                              target[target.options.selectedIndex].value
                            );
                          }}
                        >
                          {titles.map((title, index) => (
                            <option key={index} value={title}>
                              {title}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl id="type" isRequired>
                        <FormLabel>Type</FormLabel>
                        <Select
                          placeholder="Select type"
                          onChange={(event) => {
                            const { target } = event;
                            setType(target[target.options.selectedIndex].value);
                          }}
                        >
                          <option value="anime">Anime</option>
                          <option value="film">Film</option>
                          <option value="special">Special</option>
                        </Select>
                      </FormControl>
                      <FormControl id="preview_text" isRequired>
                        <FormLabel>Preview Text</FormLabel>
                        <Textarea
                          value={preview_text}
                          onChange={handlePreviewTextChange}
                        />
                      </FormControl>
                      <FormControl id="text" isRequired>
                        <FormLabel>Text</FormLabel>
                        <Textarea value={text} placeholder="Accepts markdown (use '&NewLine;' followed by a new line to insert a empty line)" onChange={handleTextChange} />
                      </FormControl>
                      <Center>
                        <Button
                          onClick={() => router.push("/admin")}
                          leftIcon={<ArrowBackIcon />}
                          mr="5%"
                          colorScheme="red"
                        >
                          Cancel
                        </Button>
                        <Button
                          isLoading={isLoading}
                          colorScheme="blue"
                          onClick={handleSubmit}
                        >
                          Submit
                        </Button>
                      </Center>
                    </VStack>
                  </Box>
                </Flex>
              </Flex>
            </Box>
          </Box>
        </Flex>
      ) : (
        <></>
      )}
    </>
  );
}

export async function getServerSideProps() {
  const staff = await getStaff();
  const animes = await getAnimes();
  const films = await getFilms();
  const specials = await getSpecials();

  const titleList = animes
    .map((anime) => anime.slug)
    .concat(films.map((film) => film.slug))
    .concat(specials.map((special) => special.slug));

  return {
    props: { staff: staff, titles: titleList },
  };
}
