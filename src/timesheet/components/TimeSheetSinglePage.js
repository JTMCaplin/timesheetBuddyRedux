import React from "react";
import LoginPanel from "./LoginPanel";

export default function TimeSheetSinglePage({ isLoggedIn, login }) {
  return (
    <div className="Timesheet Buddy">
      {!isLoggedIn && <LoginPanel login={login} />}
    </div>
  );
}
