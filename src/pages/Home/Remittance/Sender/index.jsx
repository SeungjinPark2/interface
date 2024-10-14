import { useEffect } from "react";
import { useAccountStore } from "../../../../hooks/accountStore";
import Account from "./account";
import SendForm from "./sendForm";

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
