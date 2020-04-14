import React, { useEffect, useState } from "react";

const Title = ({ path }) => {
  const [title, setTitle] = useState<string>("");
  useEffect(() => {
    if (path) setTitle(path.split("/")[1]);
  }, [path]);

  return <h2 className="b2c-title">{title}</h2>;
};

export default Title;
