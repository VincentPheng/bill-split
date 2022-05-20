import React, {useState} from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Checkbox,
  Input
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { saveTable } from '../SaveTable';

const ReceiptTable = ({ data, setData, deleteItem, payees }) => {
  const [update, setUpdate] = useState(true);

  function handleCheckboxOnChange(itemIndex, payeeIndex) {
    let newData = data;
    newData[itemIndex].payees[payeeIndex] =
      !newData[itemIndex].payees[payeeIndex];
    setData(newData);
    saveTable(newData, payees);
  }
  
  function changeItemName(newName, index) {
    let newData = data;
    newData[index].name = newName;
    setData(data);
    setUpdate(!update);
    saveTable(newData, payees);
  }

  function changeItemPrice(newPrice, index) {
    let newData = data;
    newData[index].price = newPrice;
    setData(newData);
    setUpdate(!update);
    saveTable(newData, payees);
  }

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Price</Th>
            {payees.map((payee) => {
              return <Th>{payee}</Th>;
            })}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, index) => {
            return (
              <Tr>
                <Td>
                  <Input value={item.name} onChange={(e) => changeItemName(e.target.value, index)} />
                </Td>
                <Td>
                  <Input value={item.price} onChange={(e) => changeItemPrice(e.target.value, index)} />
                </Td>
                {item.payees.map((payee, payeeIndex) => {
                  return (
                    <Td>
                      <Checkbox
                        defaultChecked={payee}
                        onChange={() =>
                          handleCheckboxOnChange(index, payeeIndex)
                        }
                      />
                    </Td>
                  );
                })}
                <Td>
                  <DeleteIcon
                    onClick={() => deleteItem(index)}
                    cursor="pointer"
                  />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ReceiptTable;
