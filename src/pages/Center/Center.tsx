import { useParams } from "react-router-dom";

function Center() {
  const { userId } = useParams()
  return (<>{userId}</>)
}

export default Center;