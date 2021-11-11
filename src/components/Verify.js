import React, {useState, useEffect} from "react";
import UserService from "../services/user.service";



const Verify = () => {

  const [allUsers, setAllUsers] = useState(undefined);

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

      
},[])

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
      <button type="submit">Save Changes</button>
    </div>
  );
};

export default Verify;