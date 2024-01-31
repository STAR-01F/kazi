import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, firestoreDB, logout } from "../../services/firebase/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

function Dashboard() {

  const [user, loading, error] = useAuthState(auth);
  //const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      if (user){
      // const q =  query(collection(firestoreDB, "users"), where("uid", "==", user?.uid));
      // const doc = await getDocs(q);
      // const data = doc.docs[0].data();
      // setName(data.name);
      }
    } catch (err) {
      console.error(err);
      if (error)console.log('Error from useAuth --> : ', error);

      alert("An error occured while fetching userdashboard data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    fetchUserName();
  }, [user, loading]);

  return (
    <div className="dashboard">
       <div className="dashboard__container">
        Logged in as
         {/* <div>{name}</div> */}
         <div>{user?.email}</div>
         <button className="dashboard__btn" onClick={logout}>
          Logout
         </button>
       </div>
     </div>
  );
}
export default Dashboard;