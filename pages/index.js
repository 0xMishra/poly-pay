import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { TOKEN_ADDRESS, TOKEN_ABI } from "../constants/constants";
import { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);

  const getProviderOrSigner = async (isNeedSigner) => {
    const web3modal = new Web3Modal();

    const instance = await web3modal.connect();
    const web3Provider = new ethers.providers.Web3Provider(instance);
    const { chainId } = await web3Provider.getNetwork();

    if (chainId !== 80001) {
      window.alert("Change the network to mumbai");
      throw new Error("Change network to mumbai");
    }
    const signer = web3Provider.getSigner();
    if (!isNeedSigner) {
      return web3Provider;
    }
    return signer;
  };

  const loadBalance = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const tokenContract = new ethers.Contract(
        TOKEN_ADDRESS,
        TOKEN_ABI,
        signer
      );
      const currentBalance = await tokenContract.balanceOf(signer.getAddress());
      const formattedBalance = ethers.utils.formatEther(currentBalance);
      setBalance(formattedBalance);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const sendPayment = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadBalance();
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>Your Balance: {balance} PAY</main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
