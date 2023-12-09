import React,{useState} from "react";
import axios from "axios";
import LeftMenuBar from "../../Components/Dashboard/LeftMenuBar";
import TopNavigationBar from "../../Components/Dashboard/TopNavigationBar";
import ProfilePic from "../../assets/icons/profileIcon.png";
function AddNewEmployee() {

  const [data,setData] = useState();
  const [team_details, setTeamDetails] = useState({
    name: "",
    email: "",
    role: "",
  });
  
  
  const handlesubmit = () => {
    const options = {
      url: "http://localhost:8080/getprofilepic",
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: localStorage.getItem("token"),
        // "Content-Type": "multipart/form-data",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: {organizaion_id: "6574101ccb172db091993b30"},
    };
    axios(options)
      .then((response) => {
        // console.log(" i am running");
        console.log(response.data);
        setData(response.data)
        
      })
      .catch((e) => {
        alert("Something Wrong");
      });
      console.log("team",team_details)
      const t = data.team_members
      t.push(team_details)
      // console.log(3,t)
      post_Method(data)
      // console.log(2,data)

  }

  

  const post_Method = (cv) => {
    // axios POST request
    // const cv = {
    //   logo: data.logo,
    //   detailed_data: {data},
    //   team_details: data.team_members,
    // };
    console.log("cv",cv)
    const options = {
      url: "http://localhost:8080/profile/setup",
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: localStorage.getItem("token"),
        // "Content-Type": "multipart/form-data",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: cv,
    };
    axios(options)
      .then((response) => {
        console.log(" i am running");
        console.log(response.status);
        if (response.status == 200) {
          navigate("/profilesetup/sucess");
        } else if (response.status == 400) {
          alert("Organization is already registered!");
        } else if (response.status == 404) {
          alert("NO USER WITH THIS USERNAME EXIST IN THE SYSTEM");
        } else {
          alert("Something went wrong, try again with proper data");
        }
      })
      .catch((e) => {
        alert("Organzation is already registered");
      });
    }

  return (
    <div className="flex bg-white">
      <div className="hidden sm:block w-2/12 bg-white h-screen">
        <LeftMenuBar />
      </div>
      <div className="w-full bg-background">
        <div className="p-0">
          <TopNavigationBar title={"Employee Update"} />
        </div>

        <div className="p-6 mt-12 bg-white w-3/4 block m-auto rounded-md  modalShadow">
          <h2 className="heading3 text-center font-medium mt-4">
            Add employee information
          </h2>

          <img src={ProfilePic} className="block m-auto mt-4"></img>
          <div className="form-control w-full max-w-xs mt-8 ml-8">
            <label className="label">
              <span className="label-text heading4">Name</span>
            </label>
            <input
              type="text"
              placeholder="Humza Sajid"
              className="input input-bordered w-full max-w-xs"
              value={team_details.name}
                onChange={(e) =>
                  setTeamDetails((old) => ({
                    ...old,
                    name: e.target.value,
                  }))
                }
            />

            <label className="label">
              <span className="label-text heading4">Email </span>
            </label>
            <input
              type="text"
              placeholder="HumzaSajid@Microsoft.com"
              className="input input-bordered w-full max-w-xs"
              value={team_details.email}
                onChange={(e) =>
                  setTeamDetails((old) => ({
                    ...old,
                    email: e.target.value,
                  }))
                }
            />

            <label className="label">
              <span className="label-text heading4">Select role:</span>
            </label>
            <select className="select select-bordered"
            onChange={(e) =>
              setTeamDetails((old) => ({ ...old, role: e.target.value }))
            }>
              <option disabled selected>
                Pick one
              </option>
              <option>Medium Level</option>
              <option>High Level</option>
              <option>Low Level</option>
            </select>
          </div>
          <button className="btn text-center m-auto block border-none bg-primary mt-8"
          onClick={handlesubmit}>
            Add{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddNewEmployee;
