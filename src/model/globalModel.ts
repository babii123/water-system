export const CREATE_MODEL = 'create_model'
export const UPDATE_MODEL = 'update_model'

export interface ControlModel {
  visible?: boolean
  editType?: string
}

export interface ActionModel {
  type: string,
  payLoad: any
}

export const ONLY = 'only'
export const MULTI = 'multi'
export const DELETE_REASON = 'Delete Reason'