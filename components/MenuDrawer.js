import {
  Drawer,
  Flex,
  Square,
  Divider,
  Center,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Button,
  IconButton,
  Input,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { useDisclosure } from '@chakra-ui/react'
import React from "react";

export default function MenuDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <>
      <IconButton ref={btnRef} onClick={onOpen} icon={<HamburgerIcon />} />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <Flex flexDirection="column" height="100%">
              <Button justifyContent="center" mt="5%" width="100%">Animes</Button>
              <Button justifyContent="center" mt="5%" width="100%">Filmes</Button>
              <Button justifyContent="center" mt="5%" mb="5%" width="100%">Especiais</Button>
              <Divider size="2px" />
              <Button justifyContent="center" mt="5%" width="100%">F.A.Q</Button>
              <Button justifyContent="center" mt="5%" width="100%">Staff</Button>
              <Button justifyContent="center" mt="5%" width="100%">Contato</Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}