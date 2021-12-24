import { Button, Text, Box, Flex } from "@chakra-ui/react";
import { UserContext } from "../../lib/UserContext";
import { useContext } from "react";
import { useRouter } from "next/router";
import { loginWithGoogle, logoutFromGoogle, setUser } from "../../lib/firebase";
import NavBar from "../../components/NavBar";

export default function CreateStuffPage() {
  const { user } = useContext(UserContext);

  return (
    <>
      {user ? (
        <LoggedInPage />
      ) : (
        <LoggedOutPage />
      )}
    </>
  );
}

function LoggedOutPage() {
  const router = useRouter();

  return (
    <Flex flexDirection="column" height="100vh">
      <NavBar pd="auto" justifyContent="start" />
      <Box
        p="5%"
        pt="2%"
        pb="auto"
        justifyContent="end"
        border="px"
        borderColor="gray.100"
      >
        <Box>
          <Flex boxShadow="lg" p="6" rounded="md" borderRadius="md">
            <Button onClick={loginWithGoogle}>Login</Button>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

function LoggedInPage() {
  const router = useRouter();

  return (
    <Flex flexDirection="column" height="100vh">
      <NavBar pd="auto" justifyContent="start" />
      <Box
        p="5%"
        pt="2%"
        pb="auto"
        justifyContent="end"
        border="px"
        borderColor="gray.100"
      >
        <Box>
          <Flex boxShadow="lg" p="6" rounded="md" borderRadius="md">
            <Button onClick={() => router.push("/admin/post")}>Create Post</Button>
            <Button onClick={logoutFromGoogle}>Logout</Button>
            </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
