import { Button, Form, Input, Message } from "semantic-ui-react";
import { useState } from "react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { useRouter } from "next/router";

const ContributeForm = ({ address }) => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage("");

    const campaign = Campaign(address);

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .contribute()
        .send({ from: accounts[0], value: web3.utils.toWei(value, "ether") });

      router.replace(`/campaigns/${address}`);
    } catch (err) {
      setErrorMessage(err.message);
    }

    setIsLoading(false);
    setValue("");
  };

  return (
    <Form onSubmit={submitHandler} error={!!errorMessage}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          label="ether"
          labelPosition="right"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </Form.Field>

      <Message error header="Oops!" content={errorMessage} />
      <Button loading={isLoading} primary>
        Contribute!
      </Button>
    </Form>
  );
};

export default ContributeForm;
