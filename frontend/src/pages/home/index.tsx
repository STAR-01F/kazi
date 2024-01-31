import {Grid} from '@mui/material';
import SavedJob from './components/SavedJob';
import JobModal from './components/JobModal';
import useFetchJobs from '@hooks/useFetchJobs';
import Dashboard from '@components/dashboard/dashboard';

const Homepage = () => {
//   const [user, loading, error] = useAuthState(auth);
//   const [name, setName] = useState('');
//   const navigate = useNavigate();

//   const fetchUserName = async () => {
//     try {
//       const q = query(collection(firestoreDB, "users"), where("uid", "==", user?.uid));
//       const doc = await getDocs(q);
//       const data = doc.docs[0].data();
//       setName(data.name);
//     } catch (err) {
//       console.error(err);
//       console.log("AuthStateError: ", error)
//       alert("An error occured while fetching user data (index.tsx)");
//     }
//   };

//   useEffect(() => {
//     if (loading) return;
//     if (!user) return navigate("/");
//     fetchUserName();
//   }, [user, loading]);


  const jobs = useFetchJobs();
  console.log('jobs-------------\n', jobs);
  return (
    <>
    <Dashboard />
    <Grid container gap={2} padding={4}>
      <JobModal />
      {jobs.data &&
        jobs.data.map((job) => {
          return (
            <SavedJob
              key={job.id}
              companyName={job.company}
              jobTitle={job.title}
              jobID={job.id}
              logoPath="../src/assets/google-logo.png"
            />
          );
        })}
    </Grid>
    </>
  );
};

export default Homepage;
