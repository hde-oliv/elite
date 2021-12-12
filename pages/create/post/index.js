import {
  FormControl,
  FormLabel,
  Textarea,
  VStack,
  Center,
  Input, Flex, Box, Heading, Select, Button
} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { useState } from "react";
import { convertToSlug } from "../../../lib/Utils";
import { setPost } from "../../../lib/Firebase";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [text, setText] = useState("");
  const [anime, setAnime] = useState("");
  const [author, setAuthor] = useState("");
  const toast = useToast()

  const handleTitleChange = (event) =>
    setTitle(event.target.value);
  const handleImageChange = (event) =>
    setImage(event.target.value);
  const handleTextChange = (event) =>
    setText(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title === "" || image === "" || author === "" || anime === "" || text === "") {
      toast({
        title: `A field is missing`,
        status: "error",
        isClosable: true,
      })
      return ;
    }
    const slug = convertToSlug(title);
    const post = {
      title,
      slug,
      image,
      text,
      author,
      anime,
    }
    console.log(post);
    setPost(post).then((res) => {
      if (res) {
        toast({
          title: `Post created`,
          status: "success",
          isClosable: true,
        })
        setImage("");
        setText("");
        setTitle("");
      } else {
        toast({
          title: `Error`,
          status: "error",
          isClosable: true,
        })
      }
    })
  }
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
          <FormControl id='title' isRequired>
            <FormLabel>Title</FormLabel>
            <Input placeholder="Insert title" value={title} onChange={handleTitleChange}/>
          </FormControl>
          <FormControl id='image' isRequired>
            <FormLabel>Image</FormLabel>
            <Input placeholder="Insert image link (16:9 image)" value={image} onChange={handleImageChange}/>
          </FormControl>
          <FormControl id='author' isRequired>
            <FormLabel>Author</FormLabel>
            <Select placeholder="Select author" onChange={(event) => {
              const { target } = event;
              setAuthor(target[target.options.selectedIndex].value)
            }}>
              <option value="rike">rike</option>
            </Select>
          </FormControl>
          <FormControl id='anime' isRequired>
            <FormLabel>Anime</FormLabel>
            <Select placeholder="Select anime" onChange={(event) => {
              const { target } = event;
              setAnime(target[target.options.selectedIndex].value )
            }}>
              <option value="to-love-ru">To Love-Ru</option>
            </Select>
          </FormControl>
          <FormControl id='text' isRequired>
            <FormLabel>Text</FormLabel>
            <Textarea value={text} onChange={handleTextChange}/>
          </FormControl>
          <Center>
            <Button colorScheme="red" onClick={handleSubmit}>
              Submit
            </Button>
          </Center>
        </VStack>
      </Box>
    </Flex>
  );
}
