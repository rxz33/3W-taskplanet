import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Feed() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/login");
    }
  }, []);

  return <div>Feed Page</div>;
}

export default Feed;