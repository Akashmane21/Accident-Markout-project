import { useState, createContext, useContext } from "react";

const Globaldata = createContext();

export const useCounter = () => useContext(Globaldata);

function GlobaldataProider(props) {
  const [Roomdata, setRoomdata] = useState([]);

  // const Username = localStorage.getItem("Name");
  const [UserName, setUserName] = useState(
    typeof window !== "undefined" ? localStorage.Name : "Name"
  );

  const [UserId, setUserId] = useState(
    typeof window !== "undefined" ? localStorage.id : "id"

  );



  const value = { UserId, UserName , Roomdata, setRoomdata };

  return (
    <Globaldata.Provider value={value}>{props.children}</Globaldata.Provider>
  );
}

export default GlobaldataProider;
