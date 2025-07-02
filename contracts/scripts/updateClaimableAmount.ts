import { ethers } from "hardhat";
import { SelfHappyBirthday } from "../typechain-types";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Updating claimable amount with the account:", deployer.address);
  
  // Replace this with your deployed contract address
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  
  // Replace this with the new amount you want to set (in USDC units with 6 decimals)
  // Example: 5 USDC = 5000000
  const newClaimableAmount = 20000000;
  
  // Get contract instance
  const SelfHappyBirthdayFactory = await ethers.getContractFactory("SelfHappyBirthday");
  const selfHappyBirthday = (await SelfHappyBirthdayFactory.attach(contractAddress)) as SelfHappyBirthday;
  
  console.log(`Getting current claimable amount...`);
  const currentAmount = await selfHappyBirthday.claimableAmount();
  console.log(`Current claimable amount: ${currentAmount} USDC units (${Number(currentAmount) / 1_000_000} USDC)`);
  
  console.log(`Setting new claimable amount to: ${newClaimableAmount} USDC units (${Number(newClaimableAmount) / 1_000_000} USDC)...`);
  
  // Update the claimable amount
  const updateTx = await selfHappyBirthday.setClaimableAmount(newClaimableAmount);
  await updateTx.wait();
  
  // Verify the new amount
  const updatedAmount = await selfHappyBirthday.claimableAmount();
  console.log(`Updated claimable amount: ${updatedAmount} USDC units (${Number(updatedAmount) / 1_000_000} USDC)`);
  
  console.log("Claimable amount updated successfully");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
