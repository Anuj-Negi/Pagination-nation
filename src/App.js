import react, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import './App.css';
import axios from 'axios';
function App() {

  const [userInfo, setUserInfo] = useState([])
  const [toggle, setToggle] = useState(1)


  const fetchInfo = () => {
    axios.get("https://reqres.in/api/users?page=" + toggle)
      .then((res) => {
        setUserInfo(res.data.data)
      })
      .catch(err => console.log(err))
  }

  console.log("userInfo =============>>>>>>>", userInfo);

  const handlePageClick = (data) => {
    const { selected } = data
    console.log(selected);
    setToggle(selected);
  }

  useEffect(() => {
    fetchInfo();
  }, [toggle])

  return (
    <div className="App">
      <h1 className="title">Pagination Nation</h1>
      <div className="userList">
        {userInfo.length>0 ?
          userInfo.map((info) => (
            <div className="card" key={info.id}>
              <div className="imageSec">
                <img src={info.avatar} />
              </div>
              <div className="infoSec">
                <p><span>First Name : &nbsp;&nbsp;</span> {info.first_name}</p>
                <p><span>Last Name : &nbsp;&nbsp;</span>{info.last_name}</p>
                <p><span>Email : &nbsp;&nbsp;&nbsp;&nbsp;</span>{info.email}</p>
              </div>
            </div>
          ))
          :
          <h1>Go to previous page no more content to lode</h1>
        }
      </div>

      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        // pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"} />

    </div>
  );
}

export default App;
