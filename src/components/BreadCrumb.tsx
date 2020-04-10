import React, { useState, useEffect, Fragment } from "react";
import { IBreadCrumb } from "../interfaces/IBreadCrumb";
import { Link } from "react-router-dom";

const BreadCrumb = (props) => {
  /** local */
  const [breadCrumbs, setBreadCrumbs] = useState<IBreadCrumb[]>([]);

  useEffect(() => {
    if (props.value && props.value.length) {
      setBreadCrumbs(props.value);
    }
  }, [props.value]);

  return (
    <div className="b2c-bread-crumbs">
      {breadCrumbs.map((breadCrumb: IBreadCrumb, index: number) => {
        return (
          <Fragment key={index}>
            {index !== breadCrumbs.length - 1 ? (
              <Link to={breadCrumb.to}> {breadCrumb.text} </Link>
            ) : (
              <span>{breadCrumb.text}</span>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default BreadCrumb;
