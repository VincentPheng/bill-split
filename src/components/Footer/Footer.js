import { Box, Flex, Text, Spacer, Divider, HStack, Link } from '@chakra-ui/react';
import React from 'react';

const Footer = () => {
  return (
    <Box bg="gray.300">
      <Flex p={3} h="3rem">
        <Text>Bill Split</Text>
        <Spacer />
        <HStack>
          <Link>About</Link>
          <Divider orientation="vertical" />
          <Link>GitHub</Link>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Footer;
