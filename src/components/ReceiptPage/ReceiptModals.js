import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Textarea,
  Flex,
  HStack,
  Text
} from '@chakra-ui/react';
import React, { useState } from 'react';

export const NewPayeeModal = ({ isOpen, onClose, addPayee }) => {
  const [newPayeeName, setNewPayeeName] = useState('');

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Enter Payee</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Name"
            onChange={(e) => setNewPayeeName(e.target.value)}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => addPayee(newPayeeName)}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export const BulkAddModal = ({ isOpen, onClose, bulkAddItem }) => {
  const [items, setItems] = useState('');
  const [prices, setPrices] = useState('');

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Enter Items</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir="column" spacing={3} mb={3}>
            <Text>
              In the left column, please input the name of each item on the
              receipt.{' '}
              <b>Every item must be on it's own line, leave no blank spaces</b>
            </Text>
            <Text>
              In the right column, please input the price of each item on the
              receipt.{' '}
              <b>
                Please make sure that the name and price of the item are on the
                same line.{' '}
              </b>
            </Text>
            <Text>
              You can drag the bottom right of each text box downwards to expand
              the area
            </Text>
          </Flex>
          <HStack>
            <Flex flexDir="column" w="50%">
              <Text fontWeight="bold">Item Name</Text>
              <Textarea
                onChange={(e) => setItems(e.target.value)}
                placeholder={'Milk\nEggs'}
              />
            </Flex>
            <Flex flexDir="column" w="50%">
              <Text fontWeight="bold">Item Price</Text>
              <Textarea
                onChange={(e) => setPrices(e.target.value)}
                placeholder={'3.99\n6.99'}
              />
            </Flex>
          </HStack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => bulkAddItem(items, prices)}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export const StartOverConfirmModal = ({ isOpen, onClose, restart }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Are you sure?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>This will delete the entire table and restart everything.</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={() => restart()}>
            Yes
          </Button>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            No
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
