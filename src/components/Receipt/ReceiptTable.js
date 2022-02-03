import { Checkbox, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCheckbox } from "./ReceiptSlice";

const RecieptTable = ({ disableCheckbox }) => {
  const payees = (useSelector((state) => state.payees.obj)).payload;
  const items = useSelector((state) => state.receipt.items);
  const dispatch = useDispatch();
  console.log(items);
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Item</Th>
          <Th>Price</Th>
          {Object.keys(payees).map((payee) => {
            return <Th>{payee}</Th>;
          })}
        </Tr>
      </Thead>
      <Tbody>
        {items.payload.map((item, index) => {
          return (
            <Tr>
              <Td>{item.name}</Td>
              <Td>{item.price}</Td>
              {Object.keys(item.payees).map((payee) => {
                return (
                  <Td>
                    {item.payees[payee] ? (
                      <Checkbox
                        defaultIsChecked
                        onChange={() => dispatch(updateCheckbox(payee, index))}
                        disabled={disableCheckbox}
                      />
                    ) : (
                      <Checkbox
                        onChange={() => dispatch(updateCheckbox(payee, index))}
                        disabled={disableCheckbox}
                      />
                    )}
                  </Td>
                );
              })}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default RecieptTable;
