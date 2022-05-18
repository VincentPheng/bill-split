import {
  Box,
  VStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Textarea,
  Flex,
  HStack,
  Heading,
  Text
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { saveTable, saveTotal } from '../SaveTable';
import ReceiptTable from './ReceiptTable';
import { useNavigate } from 'react-router-dom';

const Receipt = ({ setPayeeTotal }) => {
  let navigate = useNavigate();
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('data');
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  const [payees, setPayees] = useState(() => {
    const saved = localStorage.getItem('payees');
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  const {
    isOpen: isNewPayeeOpen,
    onOpen: onNewPayeeOpen,
    onClose: onNewPayeeClose
  } = useDisclosure();

  const {
    isOpen: isBulkAddOpen,
    onOpen: onBulkAddOpen,
    onClose: onBulkAddClose
  } = useDisclosure();

  const {
    isOpen: isStartOverOpen,
    onOpen: onStartOverOpen,
    onClose: onStartOverClose
  } = useDisclosure();

  function submit() {
    let payeeTotal = {};
    payees.forEach((payee) => {
      payeeTotal[payee] = 0.0;
    });
    data.forEach((item) => {
      let divisor = 0.0;
      const price = item.price;
      item.payees.forEach((payee) => {
        if (payee) {
          divisor += 1.0;
        }
      });
      if(divisor === 0.0) {
        divisor = 1.0
      }
      item.payees.forEach((payee, index) => {
        if (payee) {
          payeeTotal[payees[index]] += price / divisor;
        }
      });
    });
    saveTotal(payeeTotal);
    setPayeeTotal(payeeTotal);
    navigate('/results');
  }

  function restart() {
    setData([]);
    setPayees([]);
    saveTable([], []);
    onStartOverClose();
  }

  function bulkAddItem(items, prices) {
    let newData = data;

    let itemList = items.split('\n');
    let priceList = prices.split('\n');
    itemList.forEach((item, index) => {
      addItem(newData, item, parseFloat(priceList[index]));
    });
    console.log(newData);
    setData(newData);
    saveTable(newData, payees);
    onBulkAddClose();
  }

  function addItem(newData, item, price) {
    let newItemPayees = [];
    payees.forEach(() => {
      newItemPayees.push(false);
    });
    const newItem = {
      name: item,
      price: price,
      payees: newItemPayees
    };
    newData.push(newItem);
  }

  function addBlankItem() {
    const newItemPayees = [];
    payees.forEach(() => {
      newItemPayees.push(false);
    });
    const newItem = {
      name: '',
      price: 0.0,
      payees: newItemPayees
    };
    const newData = [...data, newItem];
    setData(newData);
    saveTable(newData, payees);
  }

  function addPayee(newPayeeName) {
    console.log(payees);
    let newData = data;
    newData.forEach((item) => {
      item.payees.push(false);
    });
    setData(newData);
    const newPayees = [...payees, newPayeeName];
    setPayees(newPayees);
    saveTable(newData, newPayees);
    onNewPayeeClose();
  }

  function deleteItem(index) {
    let newData = data.filter((_, i) => i !== index);
    setData(newData);
    saveTable(newData, payees);
  }

  return (
    <VStack spacing={3} m={3}>
      <HStack>
        <Button onClick={onNewPayeeOpen}>+ Add Payee</Button>
        <Button bg="red.300" onClick={onStartOverOpen}>
          Start over
        </Button>
      </HStack>

      <ReceiptTable
        data={data}
        setData={setData}
        deleteItem={deleteItem}
        payees={payees}
        setPayees={setPayees}
      />
      <Button onClick={() => addBlankItem()}>+ Add Item</Button>
      <Button onClick={onBulkAddOpen}>+ Bulk Add Items and Price</Button>
      <Button onClick={() => submit()}>Submit Receipt</Button>
      <NewPayeeModal
        isOpen={isNewPayeeOpen}
        onClose={onNewPayeeClose}
        addPayee={addPayee}
      />
      <BulkAddModal
        isOpen={isBulkAddOpen}
        onClose={onBulkAddClose}
        bulkAddItem={bulkAddItem}
      />
      <StartOverConfirmModal
        isOpen={isStartOverOpen}
        onClose={onStartOverClose}
        restart={restart}
      />
    </VStack>
  );
};

const NewPayeeModal = ({ isOpen, onClose, addPayee }) => {
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

const BulkAddModal = ({ isOpen, onClose, bulkAddItem }) => {
  const [items, setItems] = useState('');
  const [prices, setPrices] = useState('');

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Enter Items</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack>
            <Flex flexDir="column">
              <Text fontWeight="bold">Item Name</Text>
              <Textarea onChange={(e) => setItems(e.target.value)} />
            </Flex>
            <Flex flexDir="column">
              <Text fontWeight="bold">Item Price</Text>
              <Textarea onChange={(e) => setPrices(e.target.value)} />
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

const StartOverConfirmModal = ({ isOpen, onClose, restart }) => {
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

export default Receipt;
