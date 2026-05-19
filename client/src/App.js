import React, { useEffect, useState } from "react";

import axios from "axios";

function App() {

  // Complaint Form
  const [complaint, setComplaint] = useState({

    name: "",
    email: "",
    title: "",
    description: "",
    category: "",
    location: ""

  });

  // Complaint List
  const [complaints, setComplaints] = useState([]);

  // AI Result
  const [aiResult, setAiResult] = useState("");

  const [searchLocation,
setSearchLocation] = useState("");



  // Handle Form Input
  const handleChange = (e) => {

    setComplaint({

      ...complaint,

      [e.target.name]:
        e.target.value

    });

  };



  // Add Complaint
  const addComplaint = async () => {

    try {

      await axios.post(

        "http://localhost:5000/api/complaints",

        complaint

      );

      alert("Complaint Registered");

      fetchComplaints();

    } catch (error) {

      console.log(error);

    }

  };



  // Fetch Complaints
  const fetchComplaints = async () => {

    try {

      const response =
        await axios.get(

          "http://localhost:5000/api/complaints"
        );

      setComplaints(response.data);

    } catch (error) {

      console.log(error);

    }

  };



  // AI Analyze
  const analyzeComplaint = async () => {

    try {

      const response =
        await axios.post(

          "http://localhost:5000/api/ai/analyze",

          complaint

        );

      setAiResult(
        response.data.aiAnalysis
      );

    } catch (error) {

      console.log(error);

    }

  };



  // Load complaints initially
  useEffect(() => {

    fetchComplaints();

  }, []);

const updateStatus = async (id) => {

  try {

    await axios.put(

      `http://localhost:5000/api/complaints/${id}`,

      {
        status: "Resolved"
      }

    );

    fetchComplaints();

  } catch (error) {

    console.log(error);

  }

};

const searchComplaints =
async () => {

  try {

    const response =
      await axios.get(

`http://localhost:5000/api/complaints/search?location=${searchLocation}`

      );

    setComplaints(
      response.data
    );

  } catch (error) {

    console.log(error);

  }

};

  return (

    <div
  style={{
    padding: "30px",
    backgroundColor: "#f4f7fb",
    minHeight: "100vh",
    fontFamily: "Arial"
  }}
>

      <h1
  style={{
    color: "#1e3a8a",
    textAlign: "center",
    marginBottom: "30px"
  }}
>
  AI Smart Complaint Management System
</h1>

      <hr />



      <h2>
        Complaint Registration
      </h2>



      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
        style={{
  width: "300px",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid gray"
}}
      />

      <br /><br />



      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        style={{
  width: "300px",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid gray"
}}
      />

      <br /><br />



      <input
        type="text"
        name="title"
        placeholder="Complaint Title"
        onChange={handleChange}
        style={{
  width: "300px",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid gray"
}}
      />

      <br /><br />



      <textarea
        name="description"
        placeholder="Complaint Description"
        onChange={handleChange}
        style={{
  width: "300px",
  height: "100px",
  padding: "10px",
  borderRadius: "5px"
}}
      />

      <br /><br />



      <input
        type="text"
        name="category"
        placeholder="Category"
        onChange={handleChange}
        style={{
  width: "300px",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid gray"
}}
      />

      <br /><br />



      <input
        type="text"
        name="location"
        placeholder="Location"
        onChange={handleChange}
        style={{
  width: "300px",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid gray"
}}
      />

      <br /><br />



      <button onClick={addComplaint}
      style={{
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer"
}}>
        Submit Complaint
      </button>



      <button
        onClick={analyzeComplaint}
        style={{
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer"
}}
      >
        AI Analyze
      </button>



      <hr />



      <h2>
        Complaint List
      </h2>

<input
  type="text"
  placeholder="Search by Location"
  value={searchLocation}
  onChange={(e) =>
    setSearchLocation(e.target.value)
  }
  style={{
  width: "300px",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid gray"
}}
/>

<button
  onClick={searchComplaints}
  style={{
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer"
}}
>
  Search
</button>

<br /><br />


      {

        complaints.map((item, index) => (

          <div

            key={index}

            style={{
  backgroundColor: "white",
  padding: "15px",
  borderRadius: "10px",
  marginBottom: "15px",
  boxShadow: "0px 2px 5px rgba(0,0,0,0.1)"
}}

          >

            <h3>
              {item.title}
            </h3>

            <p>
              <strong>Name:</strong>
              {item.name}
            </p>

            <p>
              <strong>Category:</strong>
              {item.category}
            </p>

            <p>
              <strong>Location:</strong>
              {item.location}
            </p>

            <p>
              <strong>Status:</strong>
              {item.status}
            </p>

            <button
  onClick={() => updateStatus(item._id)}
  style={{
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer"
}}
>
  Mark Resolved
</button>

          </div>

        ))

      }



      <hr />



      <h2>
        AI Analysis Result
      </h2>



      <pre
  style={{
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    whiteSpace: "pre-wrap"
  }}
>

        {aiResult}

      </pre>

    </div>

  );

}

export default App;