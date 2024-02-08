import { useState } from 'react';

const FolderListComponent = () => {
  const createTest = () => {
    const keylist = [];
    for(let a=0; a<40+1; a++){
      keylist.push(a);
    }
    return keylist;
  }
  const [KeyList, setKeyList] = useState(createTest());
  const testContainer = {
    width: "100%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap"
  }
  let scale = 100;
  const testBox = {
    width: scale + "px",
    height: scale + "px",
    margin: "5px",
    backgroundColor: "purple"
  }
  return (
    <div className='test1Container' style={testContainer}>
      {
        KeyList.map((num, i) => (
          <div key={i} className='testBox' style={testBox}></div>
        ))
      }
    </div>
  )
}

export default FolderListComponent