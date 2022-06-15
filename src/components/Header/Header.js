import {
  Box,
  Flex,
  Spacer,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  Link,
  Button
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';

const Header = () => {
  return (
    <Box bg="gray.300">
      <Flex p={3} align="center">
        <Link as={RouterLink} to='/'>Bill Split</Link>
        <Spacer />
        <Popover>
          <PopoverTrigger>
            <Avatar cursor="pointer" />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>Account</PopoverHeader>
            <PopoverBody>
              <Flex align="center" flexDir='column'>
                <Button colorScheme="blue" w='100%'>Sign Up</Button>
                <Link>Sign in</Link>
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
    </Box>
  );
};

export default Header;
