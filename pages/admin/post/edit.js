import {
  FormControl,
  FormLabel,
  Textarea,
  VStack,
  Center,
  Input,
  Flex,
  Box,
  useDisclosure,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Select,
  Button,
  Divider,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { convertToSlug } from "../../../lib/Utils";
import {
  updatePost,
  getStaff,
  getAnimes,
  getFilms,
  getSpecials,
  deletePost,
  getPosts,
} from "../../../lib/Firebase";
import { UserContext } from "../../../lib/UserContext";
import NavBar from "../../../components/NavBar";

export default function PostEditPage({ staff, titles, posts }) {
  const { user, isAdmin } = useContext(UserContext);
  const [post, setPost] = useState(null);
  const [toFetch, setToFetch] = useState(false);

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
                    <Heading mr="auto"> Edit Post</Heading>
                    <Text> Logged as: {user.email}</Text>
                  </Center>
                  <Box
                    p="5%"
                    pb="2%"
                    pt="2%"
                    justifyContent="end"
                    border="px"
                    mt="2%"
                    borderColor="gray.100"
                  >
                    <FormControl id="title" isRequired>
                      <FormLabel>Post</FormLabel>
                      <Select
                        placeholder="Select post"
                        onChange={(event) => {
                          const { target } = event;
                          setPost(target.value);
                          setToFetch(false);
                          console.log({ post });
                        }}
                      >
                        {posts.map((post, index) => (
                          <option key={index} value={post.slug}>
                            {post.title}
                          </option>
                        ))}
                      </Select>
                      <Center>
                        {post && (
                          <>
                            <DeleteModal
                              post={posts.find((p) => p.slug === post)}
                            />
                            <Button
                              mt="1%"
                              onClick={() => {
                                setToFetch(true);
                              }}
                              colorScheme="blue"
                            >
                              Edit
                            </Button>
                          </>
                        )}
                      </Center>
                      <Divider size="2px" mt="2%" mb="1%" />
                      {post && toFetch && (
                        <SelectedPostInfo
                          staff={staff}
                          titles={titles}
                          postInfo={posts.find((p) => p.slug === post)}
                        />
                      )}
                    </FormControl>
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

function SelectedPostInfo({ postInfo, staff, titles }) {
  const [title, setTitle] = useState(postInfo.title);
  const [image, setImage] = useState(postInfo.image);
  const [text, setText] = useState(postInfo.text);
  const [preview_text, setPreviewText] = useState(postInfo.preview_text);
  const [type, setType] = useState(postInfo.type);
  const [anime, setAnime] = useState(postInfo.anime);
  const [author, setAuthor] = useState(postInfo.author);
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
      preview_text,
      type,
      author,
      anime,
    };
    updatePost(post).then((res) => {
      setIsLoading(false);
      if (res) {
        toast({
          title: `Post updated`,
          status: "success",
          isClosable: true,
        });
        router.reload();
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
          placeholder="Insert image link (only images that are 16:9, for fuck sake)"
          value={image}
          onChange={handleImageChange}
        />
      </FormControl>
      <FormControl id="author" isRequired>
        <FormLabel>Author</FormLabel>
        <Select
          placeholder="(same)"
          onChange={(event) => {
            const { target } = event;
            if (target.value) {
              setAuthor(target.value);
            } else {
              setAuthor(postInfo.author);
            }
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
          placeholder="(same)"
          onChange={(event) => {
            const { target } = event;
            if (target.value) {
              setAnime(target.value);
            } else {
              setAnime(postInfo.anime);
            }
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
          placeholder="(same)"
          onChange={(event) => {
            const { target } = event;
            if (target.value) {
              setType(target.value);
            } else {
              setType(postInfo.type);
            }
          }}
        >
          <option value="anime">Anime</option>
          <option value="film">Film</option>
          <option value="special">Special</option>
        </Select>
      </FormControl>
      <FormControl id="preview_text" isRequired>
        <FormLabel>Preview Text</FormLabel>
        <Textarea value={preview_text} onChange={handlePreviewTextChange} />
      </FormControl>
      <FormControl id="text" isRequired>
        <FormLabel>Text</FormLabel>
        <Textarea value={text} onChange={handleTextChange} />
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
        <Button colorScheme="blue" isLoading={isLoading} onClick={handleSubmit}>
          Submit
        </Button>
      </Center>
    </VStack>
  );
}

function DeleteModal({ post }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const handleDelete = async () => {
    const res = await deletePost(post);
    if (!res) {
      onClose();
      toast({
        title: `Error`,
        status: "error",
        isClosable: true,
      });
      return;
    }
    onClose();
    router.reload();
  };

  return (
    <>
      <Button mt="1%" mr="5%" onClick={onOpen} colorScheme="red">
        Delete
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete {post.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure of that?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export async function getServerSideProps() {
  const staff = await getStaff();
  const animes = await getAnimes();
  const films = await getFilms();
  const specials = await getSpecials();
  const posts = await getPosts();

  const titleList = animes
    .map((anime) => anime.slug)
    .concat(films.map((film) => film.slug))
    .concat(specials.map((special) => special.slug));

  return {
    props: { staff: staff, titles: titleList, posts: posts },
  };
}
