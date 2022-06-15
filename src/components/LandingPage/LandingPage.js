import React from 'react';
import { VStack, Heading, Text, Flex, Image, Spacer } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
const LandingPage = () => {
  return (
    <VStack mt="3rem" pr="5rem" pl="5rem">
      <Outlet />
      <Flex align="center">
        <Flex flexDirection="column">
          <Heading>Why create an account?</Heading>
          <Text fontSize="xl">
            With an account, you are able to save past receipts if you ever need
            to revisit them later.
          </Text>
          <Text fontSize="xl">
            You will also be able to export the receipts into an Excel
            compatible file format if you ever need to perform more complicated
            number crunching!
          </Text>
        </Flex>
        <Spacer />
        <Image
          src="https://bit.ly/dan-abramov"
          alt="Dan Abramov"
          boxSize="20rem"
        />
      </Flex>
      <Flex align="center">
        <Image
          src="https://bit.ly/dan-abramov"
          alt="Dan Abramov"
          boxSize="20rem"
        />

        <Flex flexDirection="column">
          <Heading align='right'>Why create an account?</Heading>
          <Text fontSize="xl" align='right'>
            With an account, you are able to save past receipts if you ever need
            to revisit them later.
          </Text>
          <Text fontSize="xl" align='right'>
            You will also be able to export the receipts into an Excel
            compatible file format if you ever need to perform more complicated
            number crunching!
          </Text>
        </Flex>
        <Spacer />
      </Flex>
    </VStack>
  );
};

export default LandingPage;
