import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer
} from '@chakra-ui/react';
const Result = ({ payeeTotal }) => {
  console.log(payeeTotal);
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Payee</Th>
            <Th>Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.keys(payeeTotal).map((payee) => {
            return (
              <Tr>
                <Td>{payee}</Td>
                <Td>{payeeTotal[payee]}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default Result;
