import { contextBridge } from "electron";
import electronApi from "./api"

contextBridge.exposeInMainWorld("electronApi", electronApi)