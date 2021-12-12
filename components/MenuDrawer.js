import {
  Drawer,
  Flex,
  Divider,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  Button,
  IconButton,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import React from "react";
import {useRouter} from "next/router";

export default function MenuDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const router = useRouter();

  return (
    <>
      <Button aria-label="Menu" ref={btnRef} onClick={onOpen} leftIcon={<HamburgerIcon />} variant='solid'>
        Menu
      </Button>
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
              <Button justifyContent="center" mt="5%" mb="5%" width="100%" onClick={() => router.push('/')}>
                Home
              </Button>
              <Divider size="2px" />
              <Button justifyContent="center" mt="5%" width="100%" onClick={() => router.push('/animes')}>
                Animes
              </Button>
              <Button justifyContent="center" mt="5%" width="100%" onClick={() => router.push('/films')}>
                Filmes
              </Button>
              <Button justifyContent="center" mt="5%" mb="5%" width="100%" onClick={() => router.push('/specials')} >
                Especiais
              </Button>
              <Divider size="2px" />
              <Button justifyContent="center" mt="5%" width="100%" onClick={() => router.push('/staff')}>
                Staff
              </Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
