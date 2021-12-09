import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <NavBar pd="auto" />
      <Button onClick={() => router.push('/animes/1')} >Tsugu Tsugumomo</Button>
    </>
  );
}
