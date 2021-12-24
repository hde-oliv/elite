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
import { setAnime } from "../../../lib/Firebase";
import { UserContext } from "../../../lib/UserContext";
import NavBar from "../../../components/NavBar";

export default function CreatePostPage() {
  const { user, isAdmin } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [folder, setFolder] = useState("");
  const [mal_url, setMalUrl] = useState("");
  const [torrentOne, setTorrentOne] = useState("");
  const [torrentTwo, setTorrentTwo] = useState("");
  const [torrentThree, setTorrentThree] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleImageChange = (event) => setImage(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handleMalUrlChange = (event) => setMalUrl(event.target.value);
  const handleFolderChange = (event) => setFolder(event.target.value);
  const handleTorrentOneChange = (event) => setTorrentOne(event.target.value);
  const handleTorrentTwoChange = (event) => setTorrentTwo(event.target.value);
  const handleTorrentThreeChange = (event) =>
    setTorrentThree(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (
      title === "" ||
      image === "" ||
      description === "" ||
      mal_url === "" ||
      folder === "" ||
      type === ""
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
    const anime = {
      description,
      image,
      links: [folder],
      mal_url,
      slug,
      torrents: [torrentOne, torrentTwo, torrentThree],
      title,
    };
    console.log(anime);
    setAnime(anime).then((res) => {
      setIsLoading(false);
      if (res) {
        toast({
          title: `Anime created`,
          status: "success",
          isClosable: true,
        });
        setImage("");
        setDescription("");
        setMalUrl("");
        setFolder("");
        setTorrentOne("");
        setTorrentTwo("");
        setTorrentThree("");
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
                    <Heading mr="auto"> Create Anime</Heading>
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
                          placeholder="Insert image link (700x1000 preferably)"
                          value={image}
                          onChange={handleImageChange}
                        />
                      </FormControl>
                      <FormControl id="mal_url" isRequired>
                        <FormLabel>MAL Link</FormLabel>
                        <Input
                          placeholder="Insert MAL link"
                          value={mal_url}
                          onChange={handleMalUrlChange}
                        />
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
                      <FormControl id="folder_link" isRequired>
                        <FormLabel>Folder</FormLabel>
                        <Input
                          placeholder="Insert folder link"
                          value={folder}
                          onChange={handleFolderChange}
                        />
                      </FormControl>
                      <FormControl id="torrent_links">
                        <FormLabel>Torrents</FormLabel>
                        <Input
                          placeholder="Insert first torrent link"
                          mb="0.5%"
                          value={torrentOne}
                          onChange={handleTorrentOneChange}
                        />
                        <Input
                          placeholder="Insert second torrent link"
                          mb="0.5%"
                          value={torrentTwo}
                          onChange={handleTorrentTwoChange}
                        />
                        <Input
                          placeholder="Insert third torrent link"
                          value={torrentThree}
                          onChange={handleTorrentThreeChange}
                        />
                      </FormControl>
                      <FormControl id="description" isRequired>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                          value={description}
                          onChange={handleDescriptionChange}
                        />
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
                          colorScheme="green"
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
