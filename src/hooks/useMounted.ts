import { useEffect, useState } from "react";

const useMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    });
  }, []);

  return mounted;
};

export default useMounted;
