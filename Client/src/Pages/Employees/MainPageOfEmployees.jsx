import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LeftMenuBar from "../../Components/Dashboard/LeftMenuBar";
import TopNavigationBar from "../../Components/Dashboard/TopNavigationBar";
import Illustration from "../../assets/illustrations/no_user.svg";


function MainPageOfEmployees() {

  const [employee,setEmployee] = useState(null);
  console.log("Employeeeeeeeee")
  useEffect(() => {
    // axios POST request
    const options = {
      url: "http://localhost:8080/getEmployee",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: {
        organization_id: localStorage.getItem("organization_id"),
      },
    };
  
    axios(options).then((response) => {
      if (response.status == 200) {
        setEmployee(response.data);
      }
      // console.log(response);
    });
  }, []);
  console.log("emp",employee)

  return (
    <div className="flex bg-white">
      <div className="hidden sm:block w-2/12 bg-white h-screen">
        <LeftMenuBar />
      </div>
      <div className="w-full bg-background">
        <div className="p-0">
          <TopNavigationBar title={"Employees"} />
        </div>
        <div className="p-6 mt-4 flex items-center gap-16">
          <h2 className="heading3">Your Employees</h2>
          <Link to={"add"}>
            <button className="btn bg-primary border-none ">
              Add Employees
            </button>
          </Link>
        </div>

        <img
          src={Illustration}
          width={350}
          height={300}
          className="block m-auto mt-20"
        ></img>
        <h2 className="heading2b text-center mt-12">
          Currently no active employee
        </h2>
      </div>
    </div>
  );
}

export default MainPageOfEmployees;
