import { Modal } from "antd"
import TextArea from "antd/es/input/TextArea";
import { DELETE_REASON, MULTI, ONLY } from "../../../model/globalModel";
import { useState } from "react";

const DeleteWaterStorageModel: React.FC<{
  deleteVisible?: boolean,
  changeDeleteVisible: Function,
  deleteValue?: { value: number[], type: string },
  _deleteWaterStorageList: Function,
  _deleteWaterStorageByReason: Function
}> = ({ deleteVisible, changeDeleteVisible, deleteValue, _deleteWaterStorageList, _deleteWaterStorageByReason }) => {
  const [deleteReason, setDeleteReason] = useState<string>()
  const [warnVisible, setWarnVisible] = useState<boolean>()
  const handleOk = () => {
    if (deleteReason) {
      if (deleteValue?.type === ONLY) {
        _deleteWaterStorageByReason(deleteValue.value[0], deleteReason)
      } else if (deleteValue?.type === MULTI) {
        _deleteWaterStorageList(deleteValue.value, deleteReason)
      }
      changeDeleteVisible(false)
    } else {
      setWarnVisible(true)
    }
  };
  return (
    <>
      <Modal title={DELETE_REASON}
        open={deleteVisible}
        onOk={handleOk}
        onCancel={() => changeDeleteVisible(false)}>
        <TextArea autoSize={{ minRows: 3, maxRows: 5 }} value={deleteReason} onChange={(e) => { setDeleteReason(e.target.value) }} />
        {
          warnVisible ?
            <span className="warn-text">Please input delete reason！！！</span>
            :
            <></>
        }
      </Modal>
    </>
  )
}

export default DeleteWaterStorageModel