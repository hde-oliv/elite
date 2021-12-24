import { Button, Text, Box, Flex } from "@chakra-ui/react";
import { UserContext } from "../../lib/UserContext";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Skeleton } from "@chakra-ui/react";
import {
  loginWithGoogle,
  logoutFromGoogle,
} from "../../lib/Firebase";
import NavBar from "../../components/NavBar";

export default function AdminsPage() {
  const { user, staff } = useContext(UserContext);

  return (
    <>
      {user && staff ? (
        <LoggedInPage />
      ) : (
        <LoggedOutPage />
      )}
    </>
  );
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
        pt="2%"
        pb="auto"
        justifyContent="end"
        border="px"
        borderColor="gray.100"
      >
        <Box>
          <Flex boxShadow="lg" p="6" rounded="md" borderRadius="md">
            {loading ? (
              <Skeleton>
                <Button>Login</Button>
              </Skeleton>
            ) : (
              <Button onClick={handleLogin}>Login</Button>
            )}
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
            <Button onClick={() => router.push("/admin/post")}>
              Create Post
            </Button>
            <Button onClick={logoutFromGoogle}>Logout</Button>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
