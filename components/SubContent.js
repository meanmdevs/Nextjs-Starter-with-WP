import React from "react";
import { FaHashtag } from "react-icons/fa";

const SubContent = ({ PageContent }) => {
     
  return (
    <React.Fragment>
      <div className="container mx-auto py-24  space-y-20 w-full">
        <div className=" lg:flex lg:flex-row justify-center px-12">
          <div className="mt-12"  dangerouslySetInnerHTML={{ __html: PageContent?.content }}/>
         
        </div>
      </div>
    </React.Fragment>
  );
};

export default SubContent;
