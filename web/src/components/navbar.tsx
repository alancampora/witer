import { Box, Button, Flex, Link } from "@chakra-ui/core";
import React from "react";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";
interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  let body = null;

  //data loading
  if (fetching) {
    //not logged in
  } else if (!data?.me.user) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <Box mr={2}>{data?.me.user?.username}</Box>
        <Button variant="link">Logout</Button>
      </Flex>
    );
    //user is logged
  }
  return (
    <Flex p={4} bg="tomato">
      <Box ml={"auto"}>
        <Box>{body}</Box>
      </Box>
    </Flex>
  );
};
