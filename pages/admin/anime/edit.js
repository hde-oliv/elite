import {
  Box,
  Flex,
  Center,
  Heading,
  Text,
  Input,
  Select,
  FormControl,
  FormLabel,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  ModalCloseButton,
  VStack,
  Textarea,
  Button,
  Divider,
} from "@chakra-ui/react";
import NavBar from "../../../components/NavBar";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  getAnimes,
  getFilms,
  getSpecials,
  updateAnime,
  deleteAnime,
} from "../../../lib/Firebase";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../lib/UserContext";
import { convertToSlug } from "../../../lib/Utils";
import { useRouter } from "next/router";

export default function AnimeEditPage({ animes, films, specials }) {
  const { user, isAdmin } = useContext(UserContext);
  const [anime, setAnime] = useState(null);
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
                    <Heading mr="auto"> Edit Anime</Heading>
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
                      <FormLabel>Anime</FormLabel>
                      <Select
                        placeholder="Select Anime"
                        onChange={(event) => {
                          const { target } = event;
                          setAnime(target.value);
                          setToFetch(false);
                        }}
                      >
                        {animes.map((anime, index) => (
                          <option key={index} value={anime.slug}>
                            {anime.title}
                          </option>
                        ))}
                        {films.map((film, index) => (
                          <option key={index} value={film.slug}>
                            {film.title}
                          </option>
                        ))}
                        {specials.map((special, index) => (
                          <option key={index} value={special.slug}>
                            {special.title}
                          </option>
                        ))}
                      </Select>
                      <Center>
                        {anime && (
                          <>
                            <DeleteModal
                              anime={animes
                                .concat(films)
                                .concat(specials)
                                .find((a) => a.slug === anime)}
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
                      {anime && toFetch && (
                        <SelectedAnimeInfo
                          animes={animes}
                          films={films}
                          specials={specials}
                          animeInfo={animes
                            .concat(films)
                            .concat(specials)
                            .find((a) => a.slug === anime)}
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

function SelectedAnimeInfo({ animeInfo }) {
  const [title, setTitle] = useState(animeInfo.title);
  const [image, setImage] = useState(animeInfo.image);
  const [description, setDescription] = useState(animeInfo.description);
  const [type, setType] = useState(animeInfo.type);
  const [folder, setFolder] = useState(animeInfo.links[0]);
  const [mal_url, setMalUrl] = useState(animeInfo.mal_url);
  const [torrentOne, setTorrentOne] = useState(animeInfo.torrents[0]);
  const [torrentTwo, setTorrentTwo] = useState(animeInfo.torrents[1]);
  const [torrentThree, setTorrentThree] = useState(animeInfo.torrents[2]);
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
    if (torrentOne === undefined) {
      setTorrentOne("");
    }
    if (torrentTwo === undefined) {
      setTorrentTwo("");
    }
    if (torrentThree === undefined) {
      setTorrentThree("");
    }

    const slug = convertToSlug(title);
    const anime = {
      description,
      image,
      links: [folder],
      mal_url,
      slug,
      type,
      torrents: [torrentOne, torrentTwo, torrentThree],
      title,
    };
    console.log({ anime, animeInfo });
    updateAnime(anime, animeInfo).then((res) => {
      setIsLoading(false);
      if (res) {
        toast({
          title: `Anime updated`,
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
          placeholder="(same)"
          onChange={(event) => {
            const { target } = event;
            if (target.value) {
              setType(target.value);
            } else {
              setType(animeInfo.type);
            }
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
        <Textarea value={description} onChange={handleDescriptionChange} />
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
  );
}

function DeleteModal({ anime }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const handleDelete = async () => {
    const res = await deleteAnime(anime);
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
          <ModalHeader>Delete {anime.title}</ModalHeader>
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
  const animes = await getAnimes();
  const films = await getFilms();
  const specials = await getSpecials();

  return {
    props: {
      animes: animes,
      films: films,
      specials: specials,
    },
  };
}
