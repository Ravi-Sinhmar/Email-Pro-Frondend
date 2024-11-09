import { useState } from "react";
import EmailComposer from "@/pages/emailComposer";
import AddEmail from "@/pages/addEmail";

export default function Component() {
  const [sharedArray, setSharedArray] = useState([]);
  const updateArray = (newArray) => {
    setSharedArray(newArray);
  };

  // sendEmailHandle function to send the email to backend
  const sendEmailHandler = (subject, message, resume) => {
    const formatedMessage = message
      .replace(/\n/g, "<br>")
      .replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
    const formData = new FormData();
    formData.append("message", formatedMessage);
    formData.append("toEmail", JSON.stringify(sharedArray)); // JSON.stringify to handle array
    formData.append("subject", subject);
    formData.append("resume", resume);
    
    fetch("http://localhost:5000/sendEmail", {
      method: "POST",
      body: formData,
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log("Success");
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 bg-zinc-950 w-svw ">
      <AddEmail sharedArray={sharedArray} updateArray={updateArray} />
      <EmailComposer sharedArray={sharedArray} sendEmailHandler={sendEmailHandler} />
    </div>
  );
}
