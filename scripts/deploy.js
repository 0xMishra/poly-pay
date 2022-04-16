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
