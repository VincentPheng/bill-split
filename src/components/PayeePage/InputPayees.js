import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Heading, Button, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import { Card } from "../SharedComponents/Card";
import FormInput from "../SharedComponents/FormInput";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storePayeeObject } from "./PayeeSlice";

const InputPayees = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [payees, setPayees] = useState([]);

  function submit() {
    if (isValidPayeeForm()) {
      var payeesObject = {}
      payees.forEach(payee => {
        payeesObject[payee] = false
      });
      dispatch(storePayeeObject(payeesObject))
      navigate("/receipt");
    }
  }

  function isValidPayeeForm() {
    for (let index = 0; index < payees.length; index++) {
      if (payees[index] === "") {
        return false;
      }
    }
    return true;
  }

  function addPayee(id) {
    setPayees([...payees, ""]);
  }

  function deletePayee(index) {
    let localPayees = [...payees];
    localPayees.splice(index, 1);
    setPayees(localPayees);
  }

  function updatePayee(value, index) {
    let localPayees = [...payees];
    localPayees[index] = value;
    setPayees(localPayees);
  }

  return (
    <Box>
      <Heading>Input Payees</Heading>
      <Card>
        {payees.map((value, index) => {
          return (
            <FormInput
              id={"payee" + index}
              label={"Payee " + index}
              mt={5}
              onChange={(e) => updatePayee(e.target.value, index)}
              rightElement={
                <IconButton
                  bg="rgba(255, 255, 255, 0)"
                  icon={<DeleteIcon />}
                  onClick={() => deletePayee(index)}
                />
              }
            />
          );
        })}

        <Button
          mt={3}
          variant="animated"
          bg="teal"
          color="white"
          onClick={() => addPayee()}
        >
          Add Payee
        </Button>
        <Button
          mt={3}
          variant="animated"
          bg="teal"
          color="white"
          onClick={() => submit()}
        >
          Submit
        </Button>
      </Card>
    </Box>
  );
};

export default InputPayees;
