import {
  VStack,
  Button,
  useDisclosure,
  HStack,
  Flex,
  Spacer
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { saveTable, saveTotal } from '../SaveTable';
import ReceiptTable from './ReceiptTable';
import { useNavigate } from 'react-router-dom';
import {
  NewPayeeModal,
  BulkAddModal,
  StartOverConfirmModal,
  RemovePayeeModal
} from './ReceiptModals';

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
  const {
    isOpen: isRemovePayeeOpen,
    onOpen: onRemovePayeeOpen,
    onClose: onRemovePayeeClose
  } = useDisclosure();
  function submit() {
    let payeeTotal = {};
    payees.forEach((payee) => {
      payeeTotal[payee] = 0.0;
    });
    data.forEach((item) => {
      let divisor = 0.0;
      const price = parseFloat(item.price);
      item.payees.forEach((payee) => {
        if (payee) {
          divisor += 1.0;
        }
      });
      if (divisor === 0.0) {
        divisor = 1.0;
      }
      item.payees.forEach((payee, index) => {
        if (payee) {
          payeeTotal[payees[index]] += price / divisor;
        }
      });
    });
    saveTotal(payeeTotal);
    setPayeeTotal(payeeTotal);
    navigate('results');
  }

  function restart() {
    setData([]);
    setPayees([]);
    saveTable([], []);
    onStartOverClose();
  }

  function bulkAddItem(items, prices) {
    let newData = data;

    items.forEach((item, index) => {
      addItem(newData, item, parseFloat(prices[index]));
    });
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

  function removePayee() {}

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
        onRemovePayeeOpen={onRemovePayeeOpen}
      />
      <Flex w="40rem">
        <Button onClick={() => addBlankItem()}>+ Add Item</Button>
        <Spacer />
        <Button onClick={onBulkAddOpen}>+ Bulk Add Items and Price</Button>
        <Spacer />
        <Button onClick={() => submit()}>Submit Receipt</Button>
      </Flex>

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
      <RemovePayeeModal
        isOpen={isRemovePayeeOpen}
        onClose={onRemovePayeeClose}
        removePayee={removePayee}
      />
    </VStack>
  );
};

export default Receipt;
