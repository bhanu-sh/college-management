import React from "react";

const LoginPage = () => {
  return (
    <div>
      <div className="">
        <a
          href="/staff/login"
          className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Staff Login
        </a>
        <a
          href="/student/login"
          className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline"
        >
          Student Login
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
