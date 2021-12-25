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
  NumberInput,
  NumberInputField,
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
  deleteStatus,
  getFilms,
  getSpecials,
  updateStatus,
  deletePost,
  getPosts,
  getStatus,
} from "../../../lib/Firebase";
import { UserContext } from "../../../lib/UserContext";
import NavBar from "../../../components/NavBar";

export default function StatusEditPage({ animes, titles, statuses }) {
  const { user, isAdmin } = useContext(UserContext);
  const [status, setStatus] = useState(null);
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
                    <Heading mr="auto"> Edit Status</Heading>
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
                      <FormLabel>Status</FormLabel>
                      <Select
                        placeholder="Select status"
                        onChange={(event) => {
                          const { target } = event;
                          setStatus(target.value);
                          setToFetch(false);
                          console.log({ status });
                        }}
                      >
                        {statuses.map((status, index) => (
                          <option key={index} value={status.slug}>
                            {status.title}
                          </option>
                        ))}
                      </Select>
                      <Center>
                        {status && (
                          <>
                            <DeleteModal
                              status={statuses.find((s) => s.slug === status)}
                              title={
                                animes.find((anime) => anime.slug === status)
                                  .title
                              }
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
                      {status && toFetch && (
                        <SelectedStatusInfo
                          animes={animes}
                          titles={titles}
                          statusInfo={statuses.find((s) => s.slug === status)}
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

function SelectedStatusInfo({ animes, titles, statusInfo }) {
  const [anime, setAnime] = useState(statusInfo.slug);
  const [status, setStatus] = useState(statusInfo.status);
  const [type, setType] = useState(statusInfo.type);
  const [nextNumber, setNextNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusChange = (event) => setStatus(event.target.value);
  const handleNextNumberChange = (event) => setNextNumber(event.target.value);

  const router = useRouter();
  const toast = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (anime === "" || status === "" || type === "") {
      toast({
        title: `A field is missing`,
        status: "error",
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }
    const slug = anime;
    const title = animes.find((anime) => anime.slug === slug).title;
    let next;
    if (nextNumber === "") {
      next = statusInfo.next;
    } else if (type === "volume") {
      next = `Vol. ${nextNumber}`;
    } else {
      next = `Ep. ${nextNumber}`;
    }
    const newStatus = {
      slug,
      status,
      next,
      title,
    };
    console.log(newStatus);
    updateStatus(newStatus).then((res) => {
      setIsLoading(false);
      if (res) {
        toast({
          title: `Status updated`,
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
    return null;
  };

  return (
    <VStack spacing="1.5%">
      <FormControl id="anime" isRequired>
        <FormLabel>Anime</FormLabel>
        <Select
          placeholder="(same)"
          onChange={(event) => {
            const { target } = event;
            if (target.value) {
              setAnime(target.value);
            } else {
              setAnime(statusInfo.anime);
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
              setType(statusInfo.type);
            }
          }}
        >
          <option value="volume">Volume</option>
          <option value="episode">Episode</option>
        </Select>
      </FormControl>
      <FormControl id="Status" isRequired>
        <FormLabel>Status</FormLabel>
        <Input
          placeholder="Insert status (ex: QC, Edição, etc...)"
          value={status}
          onChange={handleStatusChange}
        />
      </FormControl>
      <FormControl id="next" isRequired>
        <FormLabel>Next</FormLabel>
        <Input
          placeholder="(Do not alter this field to keep the old value)"
          value={nextNumber}
          onChange={handleNextNumberChange}
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
        <Button isLoading={isLoading} colorScheme="blue" onClick={handleSubmit}>
          Submit
        </Button>
      </Center>
    </VStack>
  );
}

function DeleteModal({ status, title }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const handleDelete = async () => {
    const res = await deleteStatus(status);
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
          <ModalHeader>Delete status from {title}</ModalHeader>
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
  const statuses = await getStatus();

  const titleList = animes
    .map((anime) => anime.slug)
    .concat(films.map((film) => film.slug))
    .concat(specials.map((special) => special.slug));

  const animeList = animes.concat(films).concat(specials);

  return {
    props: { animes: animeList, titles: titleList, statuses },
  };
}
