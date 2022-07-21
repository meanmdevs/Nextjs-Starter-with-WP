import React from "react";


const Blog = ({BlogList}) => {  

  return (
    <React.Fragment>
      <div className="container mx-auto py-24  space-y-20 w-full">
        <div className=" lg:flex lg:flex-row justify-center px-12">
        {BlogList.map((item) => (
          <div className="col-span-2 flex flex-col space-y-4 items-center justify-center text-center">
            <img src={item?.node?.featuredImage?.node?.sourceUrl} />
            <p className="text-2xl font-medium text-gray-600">
              {item?.node?.title}
            </p>
            <p className="text-gray-600">{item?.node?.excerpt}</p>
          </div>
        ))} 
        </div>
      </div>
    </React.Fragment>
  );
};

export default Blog;
