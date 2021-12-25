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
  setNewStatus,
  getAnimes,
  getFilms,
  getSpecials,
} from "../../../lib/Firebase";
import { UserContext } from "../../../lib/UserContext";
import NavBar from "../../../components/NavBar";

export default function StatusCreatePage({ animes, titles }) {
  const { user, isAdmin } = useContext(UserContext);
  const [status, setStatus] = useState("");
  const [nextNumber, setNextNumber] = useState("");
  const [type, setType] = useState("");
  const [anime, setAnime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const handleStatusChange = (event) => setStatus(event.target.value);
  const handleNextNumberChange = (event) => setNextNumber(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (anime === "" || status === "" || type === "" || nextNumber === "") {
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
    if (type === "volume") {
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
    setNewStatus(newStatus).then((res) => {
      setIsLoading(false);
      if (res) {
        toast({
          title: `Status created`,
          status: "success",
          isClosable: true,
        });
        setStatus("");
        setNextNumber("");
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
                    <Heading mr="auto"> Create Status</Heading>
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
                          placeholder="Insert the next number to be released (ex: 1, 2, etc...)"
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
  const animes = await getAnimes();
  const films = await getFilms();
  const specials = await getSpecials();

  const titleList = animes
    .map((anime) => anime.slug)
    .concat(films.map((film) => film.slug))
    .concat(specials.map((special) => special.slug));

  const animeList = animes.concat(films).concat(specials);

  return {
    props: { animes: animeList, titles: titleList },
  };
}
