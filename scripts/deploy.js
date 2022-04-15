const hre = require("hardhat");

async function main() {
  const PaymentToken = await hre.ethers.getContractFactory("PaymentToken");
  const paymentToken = await PaymentToken.deploy();

  await paymentToken.deployed();

  console.log("Payment Token deployed to:", paymentToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

//token address: 0x0dC497A2b4e3B4c58Fd8640A53C6d00510c90c11
