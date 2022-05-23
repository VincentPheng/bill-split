import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Button
} from '@chakra-ui/react';
import {Link} from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';

const Result = ({ payeeTotal }) => {
  console.log(payeeTotal);
  return (
    <Box>
      <Link to="/">
      <Button>
        <ArrowBackIcon />
      </Button>
      </Link>
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
                  <Td>{"$" + payeeTotal[payee].toFixed(2)}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Result;
