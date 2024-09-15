import { ethers } from "./ethers.js";
import { contractAddress, abi } from "./constant.js";
const btn_connect = document.getElementById("btn_connect");
const btn_set = document.getElementById("btn_set");
const btn_transfer1 = document.getElementById("btn_transfer1");
const btn_transfer2 = document.getElementById("btn_transfer2");

btn_connect.onclick = connect;
btn_set.onclick = set;
btn_transfer1.onclick = transfer1;
btn_transfer2.onclick = transfer2;

async function connect() {
  if (typeof window.ethereum != "undefined") {
    console.log("Connecting to metamask...");
    await window.ethereum.request({ method: "eth_requestAccounts" });
    console.log("Connected");
  } else {
    console.log("No metamask!!!");
  }
}
async function set() {
  if (typeof window.ethereum != "undefined") {
    console.log("Setting...");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const transActionResponse = await contract.allowlistDestinationChain(ethers.BigNumber.from("10344971235874465080"),true);
    await listenForTransactionMine(transActionResponse, provider);
    console.log("Set Finished");
  } else {
    console.log("No metamask!!!");
  }
}
async function transfer1() {
  if (typeof window.ethereum != "undefined") {
    console.log("transfer1...");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const gasLimit = 1000000;
    const amount = ethers.utils.parseEther("0.2")
    const transActionResponse = await contract.transferTokensPayLINK(ethers.BigNumber.from("10344971235874465080"),"0x294e0bCC654D249eA6EF17f9f83d20B58999C921","0xFd57b4ddBf88a4e07fF4e34C487b99af2Fe82a05",amount,{ gasLimit });
    await listenForTransactionMine(transActionResponse, provider);
    // console.log(transActionResponse)
    console.log("transfer1 Finished");
  } else {
    console.log("No metamask!!!");
  }
}

async function transfer2() {
  if (typeof window.ethereum != "undefined") {
    console.log("transfer2...");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const gasLimit = 1000000;
    const amount = ethers.utils.parseEther("0.3")
    const transActionResponse = await contract.transferTokensPayNative(ethers.BigNumber.from("10344971235874465080"),"0x294e0bCC654D249eA6EF17f9f83d20B58999C921","0xFd57b4ddBf88a4e07fF4e34C487b99af2Fe82a05",amount,{ gasLimit });
    await listenForTransactionMine(transActionResponse, provider);
    // console.log(transActionResponse)

    console.log("transfer2 Finished");
  } else {
    console.log("No metamask!!!");
  }
}

function listenForTransactionMine(transactionResponse, provider) {
  console.log(`Mining ${transactionResponse.hash}`);
  return new Promise((resolve, reject) => {
    try {
      provider.once(transactionResponse.hash, (transactionReceipt) => {
        console.log(
          `Completed with ${transactionReceipt.confirmations} confirmations. `
        );
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
