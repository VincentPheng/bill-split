import { Box, Button, Checkbox, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FormInput from "../SharedComponents/FormInput";
import RecieptTable from "./ReceiptTable";
import { addItem } from "./ReceiptSlice";
const Reciept = () => {
  const payees = useSelector((state) => state.payees.obj);
  const [items, setItems] = useState([]);

  return (
    <Box>
      <RecieptTable />
      <RecieptForm payees={payees.payload} items={items} setItems={setItems} />
      <Button mt={3} w="100%">
        Submit Receipt
      </Button>
    </Box>
  );
};

const RecieptForm = ({ payees, items, setItems }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [statePayees, setStatePayees] = useState(payees);

  const dispatch = useDispatch();

  function submit() {
    if (validItem()) {
      const item = {
        name: name,
        price: price,
        payees: statePayees,
      };
      setItems([...items, item]);
      dispatch(addItem(item));
    }
  }

  function validItem() {
    return name !== "" && price !== "";
  }

  return (
    <Stack>
      <FormInput
        id="item"
        label="Item"
        onChange={(e) => setName(e.target.value)}
      />
      <FormInput
        id="price"
        label="Price"
        placeholder="$__.__"
        onChange={(e) => setPrice(e.target.value)}
      />
      {Object.keys(payees).map((payee) => {
        return (
          <Checkbox
            checked={statePayees[payee]}
            onChange={() =>
              setStatePayees({ ...statePayees, [payee]: !statePayees[payee] })
            }
          >
            {payee}
          </Checkbox>
        );
      })}
      <Button mt={3} onClick={() => submit()}>
        Submit Item
      </Button>
    </Stack>
  );
};

export default Reciept;
