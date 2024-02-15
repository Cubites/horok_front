import { useEffect, useState } from 'react'

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
    flexWrap: "wrap",
    position: 'relative'
  }
  let scale = 60;
  const testBox = {
    width: scale + "px",
    height: scale + "px",
    margin: "5px",
    backgroundColor: "yellowgreen"
  }
  const ShowModal = () => {
    document.getElementById("asdf").classList.toggle('noShow');
  }

  return (
    <div className='test1Container' style={testContainer}>
      <div style={{width: '90%', backgroundColor: '#ddd', padding: '10px'}}>
        <div style={{width: '90%', height: '40px', backgroundColor: '#333', color: '#fff'}}>
          asdghajsdhgkjasgd
        </div>
        <div style={{width: '90%', height: '40px', backgroundColor: '#333', color: '#fff'}}>
          asdghajsdhgkjasgd
        </div>
        <div style={{width: '90%', height: '40px', backgroundColor: '#333', color: '#fff', display: 'none'}}>
          asdghajsdhgkjasgd
        </div>
        <div style={{width: '90%', height: '40px', backgroundColor: '#333', color: '#fff', display: 'none'}}>
          asdghajsdhgkjasgd
        </div>
        <div style={{width: '90%', height: '40px', backgroundColor: '#333', color: '#fff', display: 'none'}}>
          asdghajsdhgkjasgd
        </div>
        <div style={{width: '90%', height: '40px', backgroundColor: '#333', color: '#fff', display: 'none'}}>
          asdghajsdhgkjasgd
        </div>
      </div>
    </div>
  )
}

export default MypageComponent