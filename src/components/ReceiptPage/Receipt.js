import {
  VStack,
  Button,
  useDisclosure,
  HStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { saveTable, saveTotal } from '../SaveTable';
import ReceiptTable from './ReceiptTable';
import { useNavigate } from 'react-router-dom';
import { NewPayeeModal, BulkAddModal, StartOverConfirmModal } from './ReceiptModals';

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
      const price = parseFloat(item.price);
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



export default Receipt;
