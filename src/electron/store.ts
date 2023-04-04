import { app } from "electron";
import * as path from "path";
import * as fs from "fs";

class Store<T extends GenericObject> {
  path: string;
  data: T;

  constructor({ fileName, defaults }: StoreProps<T>) {
    const userDataPath = app.getPath("userData");
    this.path = path.join(userDataPath, fileName + ".json");
    this.data = parseDataFile(this.path, defaults);
  }

  get<K extends keyof T>(key: K): T[K] {
    return this.data[key];
  }

  set<K extends keyof T, V extends T[K]>(key: K, value: V) {
    if (key in this.data) {
      this.data = { ...this.data, [key as keyof T]: value };
      try {
        fs.writeFileSync(this.path, JSON.stringify(this.data));
      } catch (error) {
        console.log(`[Store] Error on try to write data file: ${error}`);
      }
    }
  }
}

function parseDataFile(filePath: string, defaults: GenericObject) {
  try {
    return JSON.parse(fs.readFileSync(filePath).toString());
  } catch {
    return defaults;
  }
}

export { Store };
