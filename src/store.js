import { configureStore } from "@reduxjs/toolkit";
import PayeeSlice from "./components/PayeePage/PayeeSlice";
import ReceiptSlice from "./components/Receipt/ReceiptSlice";
export default configureStore({
  reducer: {
    payees: PayeeSlice,
    receipt: ReceiptSlice
  },
});
