import { useState } from 'react'

const MypageComponent = () => {
  const createTest = () => {
    const keylist = [];
    for(let a=0; a<60+1; a++){
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
  let scale = 60;
  const testBox = {
    width: scale + "px",
    height: scale + "px",
    margin: "5px",
    backgroundColor: "yellowgreen"
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

export default MypageComponent