export interface WaterStorageTableType {
  key?: number
  id: number
  resourceId: number;
  addTime?: Date;
  addUser?: string
  detectTime?: Date;
  detectPeople?: string[];
  supply?: number;
  storage?: number;
  isDel?: boolean;
  delReason?: string;
}

export interface WaterStorageData {
  id: number
  resourceId: number;
  addTime: Date;
  addUser: string
  detectTime: Date;
  detectPeople: string[];
  supply: number;
  storage: number;
  isDel: boolean;
  delReason: string;
}

