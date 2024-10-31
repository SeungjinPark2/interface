import { useEffect } from "react";
import { useAccountStore } from "../../../../hooks/accountStore";
import Account from "./Account";
import SendForm from "./SendForm";

function Sender() {
  const { accountInfo, getAccountInfo } = useAccountStore();

  useEffect(() => {
    getAccountInfo();
  }, []);

  return (
    <>
      <Account accountInfo={accountInfo} />
      <SendForm />
    </>
  );
}

export default Sender;
