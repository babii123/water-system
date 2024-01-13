export enum Gender {
  MALE = 1,
  FEMALE = 2
}

export interface UserInfo {
  id: number
  userId: string,
  realName: string
  accountName: string
  email: string
  phone: string
  sex: Gender
  birthday: Date | undefined
  roles: string[]
}

export interface UserTableType {
  key: number
  id: number
  userId: string
  realName: string
  accountName: string
  email: string
  phone: string
  sex: number
  birthday: Date | any
  roles: string[]
}