import { Network, TatumSDK, Ethereum } from "@tatumio/tatum";
import React, { useState } from "react";
import styles from './style.module.css';

function BalanceForm() {
    const [inputValue, setInputValue] = useState("");
    const [labelText, setLabelText] = useState("");
    const [errorMessage, setErrorMessage] = useState<(string | object)[]>([]);

    const getBalanceData = async () => {
        const tatum = await TatumSDK.init<Ethereum>({
            network: Network.ETHEREUM,
            apiKey: { v4: import.meta.env.VITE_TATUM_API_KEY },
            verbose: true,
        });
        const balance = await tatum.address.getBalance({
            addresses: [inputValue],
        });
        const balanceData = balance.data?.filter(
            (asset) => asset.asset === "ETH"
        )[0];

        if (!balance.error) {
            setLabelText(`Balance: ${balanceData?.balance}`);
        }

        setErrorMessage(balance.error?.message);
    };

    return (
        <div>
            <p>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        setLabelText('');
                        setErrorMessage([]);
                    }}
                    placeholder="Enter ETH wallet address to get balance"
                    style={{ padding: "5px", width: "320px" }}
                />
            </p>
            <button onClick={getBalanceData} style={{ padding: "5px" }}>
                Get Balance Data
            </button>
            <p className={styles.balance}>
                {labelText}
            </p>
            {errorMessage?.length ? errorMessage.map(message => <p className={styles.errorMessage}>{message}</p>) : <></>}
        </div>
    );
}

export default BalanceForm;
