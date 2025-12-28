import useAuthContext from "../hooks/useAuthContext";

const Home = () => {
  const { logoutSession } = useAuthContext();
  return (
    <div className="w-screen h-screen bg-amber-100">
      <button
        onClick={() => {
          logoutSession();
        }}
      >
        logout
      </button>
    </div>
  );
};

export default Home;
