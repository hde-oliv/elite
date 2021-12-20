import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Box,
  Heading,
  IconButton,
  Button,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useDisclosure } from "@chakra-ui/hooks";
import { SearchIcon } from '@chakra-ui/icons';
import { findAnime, findFilm, findSpecial, findPost } from '../lib/Firebase';
import { useState } from 'react';

export default function SearchModal({ searchTerm }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [matchedAnimes, setMatchedAnimes] = useState([])
  const [matchedFilms, setMatchedFilms] = useState([])
  const [matchedSpecials, setMatchedSpecials] = useState([])
  const [matchedPosts, setMatchedPosts] = useState([])

  const handleSearch = async () => {
    const matchedAnimes = await findAnime(searchTerm);
    const matchedFilms = await findFilm(searchTerm);
    const matchedSpecials = await findSpecial(searchTerm);
    const matchedPosts = await findPost(searchTerm);

    setMatchedAnimes(matchedAnimes);
    setMatchedFilms(matchedFilms);
    setMatchedSpecials(matchedSpecials);
    setMatchedPosts(matchedPosts);
  }

  return (
    <>
      <IconButton type="submit" size="md" icon={<SearchIcon />} onClick={onOpen}/>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Resultados</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button onClick={handleSearch}>
              Search
            </Button>
            {
              matchedAnimes.length > 0 &&
              matchedAnimes.map((anime, index) => (
                <Box key="index">
                  <Heading as="h2" size="md">{anime.title}</Heading>
                </Box>
              ))
            }
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
