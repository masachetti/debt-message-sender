import { Client, ClientInfo, WAState } from "whatsapp-web.js";

let wppClient: Client | null = null;
let prevQrCode = "";
let isConnected = false;

interface StartWppParams {
  onQrCodeGenerated: (qrCode: string) => void;
  onClientReady: (clientInfo: ClientInfo) => void;
}

function startWpp({ onQrCodeGenerated, onClientReady }: StartWppParams) {
  if (wppClient) {
    if (isConnected) {
      onClientReady(wppClient.info);
      return;
    }
    onQrCodeGenerated(prevQrCode);
    return;
  }
  wppClient = new Client({});
  wppClient.on("qr", (qr) => {
    prevQrCode = qr;
    onQrCodeGenerated(qr);
  });
  wppClient.on("ready", () => {
    if (wppClient) {
      isConnected = true;
      onClientReady(wppClient.info);
    }
  });
  wppClient.initialize();
}

async function sendMessage(
  e: Electron.IpcMainInvokeEvent,
  phoneNumber: string,
  message: string
) {
  const sanitized_number = phoneNumber.toString().replace(/[- )(]/g, ""); // remove unnecessary chars from the number
  const final_number = `55${sanitized_number}`; // add 91 before the number here 91 is country code of India

  if (wppClient) {
    const number_details = await wppClient.getNumberId(final_number); // get mobile number details
    if (number_details) {
      const sendMessageData = await wppClient.sendMessage(
        number_details._serialized,
        message
      );
      if (await sendMessageData.getInfo()) return true;
    }
  }
  return false;
}

function closeWpp() {
  if (wppClient) wppClient.destroy();
}

export { startWpp, closeWpp, sendMessage };
