import { useEffect, useState } from "react";
import "./App.css";
import Neis, { SchoolInfoResponse } from "neis.ts";

function App() {
  const [count, setCount] = useState<SchoolInfoResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const neis = new Neis({
    key: import.meta.env.VITE_NEIS_API_KEY,
  });

  const getData = async () => {
    try {
      setLoading(true);
      const data = await neis.getSchool({
        SCHUL_NM: "대덕소프트웨어마이스터고등학교",
      });
      setCount(data);
    } catch (err) {
      setCount([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="text-red-500">
      {count ? count[0].ENG_SCHUL_NM : "데이터 없음"}
    </div>
  );
}

export default App;
