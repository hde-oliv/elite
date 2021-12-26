import { Button, Text, Box, Flex, Center } from "@chakra-ui/react";
import { UserContext } from "../../lib/UserContext";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { loginWithGoogle, logoutFromGoogle } from "../../lib/Firebase";
import NavBar from "../../components/NavBar";

export default function AdminPage() {
  const { user, isAdmin } = useContext(UserContext);

  return <>{user && isAdmin ? <LoggedInPage /> : <LoggedOutPage />}</>;
}

function LoggedOutPage() {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    loginWithGoogle();
  };

  return (
    <Flex flexDirection="column" height="100vh">
      <NavBar pd="auto" justifyContent="start" />
      <Box
        p="5%"
        pt="1%"
        pb="auto"
        justifyContent="end"
        border="px"
        borderColor="gray.100"
      >
        <Box>
          <Flex boxShadow="lg" p="6" rounded="md" borderRadius="md">
            <Button isLoading={loading} onClick={handleLogin}>
              Login
            </Button>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

function LoggedInPage() {
  const router = useRouter();
  const { user, staff } = useContext(UserContext);

  return (
    <Flex flexDirection="column" height="100vh">
      <NavBar pd="auto" justifyContent="start" />
      <Box
        p="5%"
        pt="1%"
        pb="auto"
        justifyContent="end"
        border="px"
        borderColor="gray.100"
      >
        <Box>
          <Flex boxShadow="lg" p="6" rounded="md" borderRadius="md">
            <Flex mr="auto" justifyContent="start" flex="2" pl="5%">
              <Button
                mr="3%"
                width="100%"
                onClick={() => router.push("/admin/post/create")}
              >
                Create Post
              </Button>
              <Button
                mr="3%"
                width="100%"
                onClick={() => router.push("/admin/post/edit")}
              >
                Edit Post
              </Button>
              <Button
                mr="3%"
                width="100%"
                onClick={() => router.push("/admin/anime/create")}
              >
                Create Anime
              </Button>
              <Button
                mr="3%"
                width="100%"
                onClick={() => router.push("/admin/anime/edit")}
              >
                Edit Anime
              </Button>
              <Button
                mr="3%"
                width="100%"
                onClick={() => router.push("/admin/status/create")}
              >
                Create Status
              </Button>
              <Button
                mr="5%"
                width="100%"
                onClick={() => router.push("/admin/status/edit")}
              >
                Edit Status
              </Button>
              <Button width="100%" onClick={logoutFromGoogle}>
                Logout
              </Button>
            </Flex>
            <Flex ml="auto" justifyContent="end" flex="1" pr="5%">
              <Center flexDirection="column">
                <Text mb="5%"> Logged as: {user.email}</Text>
              </Center>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
