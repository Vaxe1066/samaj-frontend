import React, {useState, useEffect, useRef} from "react";
import userService from "../services/user.service";
import UserService from "../services/user.service";



const Verify = () => {

  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  //get all users profile
  useEffect(()=>{
    UserService.getAllUsers().then(
      //AuthService.register(formData).then(
        (response) => {
          const noneUsers = response.data.filter(function(noneUser){
            return noneUser.role==="NONE";
          })
          setAllUsers(noneUsers)
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

            setAllUsers("#error");
        }
      )

      
},[message])


const testSelected = (e) => {

  const selecteduser =  allUsers.filter(function(sel){
    return sel._id===e.target.id;
  })

  const findObject = (obj) => obj === selecteduser[0] //function to find object
  let idx = allUsers.findIndex(findObject) //find index of object in array
  const newArr = allUsers.slice(0)
  //change role below
  const selecteduserSliced = selecteduser[0]
  selecteduserSliced.role = e.target.value;

  newArr[idx] = selecteduser[0]


  setAllUsers(newArr);
  console.log(allUsers)


}




const onHandleSaveChanges = () => {

  //check for nones
    setLoading(true);
    setMessage("");
  
    allUsers.forEach((user) => {
      if(user.role!=="NONE"){
        UserService.updateUserRole(user._id, user.role).then(
          (response) => {
              setLoading(false);
              setMessage(response.data.message);
              setAllUsers([])
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
      
            setLoading(false);
            setMessage(resMessage);
          }
        );
        setLoading(false);
        setMessage("");
      } else{setLoading(false);}
    })
}



  return (
    <div className="container">
      <header className="jumbotron">
        <h1>Verify Bhakta Samaj Members</h1>
      </header>
      <table id="verify-members-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Profile Pic</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {allUsers ? allUsers.map((user)=> {
            return(
              <tr key={user._id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td><img className="profile-pic" alt="user profile" src={user.profileImg}/></td>
                <td>
                    <select id={user._id} name="cars" onChange={testSelected}>
                      <option value="NONE" defaultValue>None</option>
                      <option value="MEMBER">Member</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                </td>
            </tr>
            )
          }): ""}
        </tbody>
      </table>
            {allUsers.length ? <div className="form-group"  type="submit" onClick={onHandleSaveChanges}>
              <button className="btn btn-primary btn-block" disabled={loading}>
                  {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Save Changes</span>
              </button>
            </div> :
              <div className="form-group">
                <div className="alert alert-success" role="alert">
                <p>There are no new users to verify</p>
                </div>
              </div> }
            {message && (
            <div className="form-group">
                <div className="alert alert-danger" role="alert">
                {message}
                </div>
            </div>
            )}
    </div>
  );
};

export default Verify;