import { Button, Heading, Text, Box, Flex } from "@chakra-ui/react";
import { UserContext } from "../../lib/UserContext";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { loginWithGoogle, logoutFromGoogle } from "../../lib/Firebase";
import NavBar from "../../components/NavBar";

const AdminPage = () => {
  const { user, isAdmin } = useContext(UserContext);

  return <>{user && isAdmin ? <LoggedInPage /> : <LoggedOutPage />}</>;
};

function LoggedOutPage() {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    loginWithGoogle();
  };

  return (
    <Box maxW="100vw" width="100%" mx="auto" px={{ base: 2, sm: 12, md: 17 }}>
      <NavBar />
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p="5%"
        pt="1%"
        pb="auto"
      >
        <Button isLoading={loading} onClick={handleLogin}>
          Login
        </Button>
      </Flex>
    </Box>
  );
}

function LoggedInPage() {
  const router = useRouter();
  const { user } = useContext(UserContext);

  return (
    <Box maxW="100vw" width="100%" mx="auto" px={{ base: 2, sm: 12, md: 17 }}>
      <NavBar />
      <Heading mt="2%" pl="5%" textAlign="left">
        Admin Panel
      </Heading>
      <Text pl="5%" mb="1%">
        Logged as: {user?.email}
      </Text>
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p="5%"
        pt="1%"
        pb="auto"
      >
        <Button
          width="100%"
          size="lg"
          mb="1%"
          onClick={() => router.push("/admin/post/create")}
        >
          Create Post
        </Button>
        <Button
          width="100%"
          size="lg"
          mb="1%"
          onClick={() => router.push("/admin/post/edit")}
        >
          Edit Post
        </Button>
        <Button
          width="100%"
          size="lg"
          mb="1%"
          onClick={() => router.push("/admin/anime/create")}
        >
          Create Anime
        </Button>
        <Button
          width="100%"
          size="lg"
          mb="1%"
          onClick={() => router.push("/admin/anime/edit")}
        >
          Edit Anime
        </Button>
        <Button
          width="100%"
          size="lg"
          mb="1%"
          onClick={() => router.push("/admin/status/create")}
        >
          Create Status
        </Button>
        <Button
          width="100%"
          size="lg"
          mb="3%"
          onClick={() => router.push("/admin/status/edit")}
        >
          Edit Status
        </Button>
        <Button width="100%" size="lg" onClick={logoutFromGoogle}>
          Logout
        </Button>
      </Flex>
    </Box>
  );
}

export default AdminPage;
