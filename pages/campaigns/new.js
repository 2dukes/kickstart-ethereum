import Layout from "../../components/Layout";
import "semantic-ui-css/semantic.min.css";
import { Form, Button, Input, Message } from "semantic-ui-react";
import { useState } from "react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { useRouter } from "next/router";

const CampaignNew = () => {
  const [minimumContribution, setMinimumContribution] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onChangeInputHandler = (event) => {
    setMinimumContribution(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage("");
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(minimumContribution)
        .send({ from: accounts[0] });
    } catch (err) {
      setErrorMessage(err.message);
    }
    setIsLoading(false);
    router.push('/');
  };

  return (
    <Layout>
      <h3>Create a Campaign</h3>

      <Form onSubmit={submitHandler} error={!!errorMessage}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            value={minimumContribution}
            onChange={onChangeInputHandler}
          />
        </Form.Field>

        <Message error header="Oops!" content={errorMessage} />
        <Button loading={isLoading} primary>
          Create!
        </Button>
      </Form>
    </Layout>
  );
};

export default CampaignNew;
