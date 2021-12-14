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
  Select,
  Button,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";
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

export default function CreatePostPage({ staff, titles }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [text, setText] = useState("");
  const [anime, setAnime] = useState("");
  const [author, setAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleImageChange = (event) => setImage(event.target.value);
  const handleTextChange = (event) => setText(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (
      title === "" ||
      image === "" ||
      author === "" ||
      anime === "" ||
      text === ""
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
      author,
      anime,
    };
    console.log(post);
    setPost(post).then((res) => {
      setIsLoading(false);
      if (res) {
        toast({
          title: `Post created`,
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
    <Flex flexDirection="column" height="100vh">
      <Center pt="2%">
        <Heading>Create Post</Heading>
      </Center>
      <Box
        p="5%"
        pt="2%"
        pb="auto"
        justifyContent="end"
        border="px"
        borderColor="gray.100"
      >
        <VStack spacing="2%">
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
              placeholder="Insert image link (16:9 image)"
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
                setAuthor(target[target.options.selectedIndex].value);
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
                setAnime(target[target.options.selectedIndex].value);
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
                setAnime(target[target.options.selectedIndex].value);
              }}
            >
              <option value="anime">Anime</option>
              <option value="film">Film</option>
              <option value="special">Special</option>
            </Select>
          </FormControl>
          <FormControl id="text" isRequired>
            <FormLabel>Text</FormLabel>
            <Textarea value={text} onChange={handleTextChange} />
          </FormControl>
          <Center>
            <Button isLoading={isLoading} colorScheme="red" onClick={handleSubmit}>
              Submit
            </Button>
          </Center>
        </VStack>
        <Center>
          <Button mt="2%" onClick={() => router.push("/")} leftIcon={<ArrowBackIcon />}>
            Home
          </Button>
        </Center>
      </Box>
    </Flex>
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
