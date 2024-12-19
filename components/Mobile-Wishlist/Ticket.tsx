import React from "react";

const Ticket = () => {
  const ticketContainerStyle = {
    width: "256px",
    height: "96px",
    borderRadius: "0.5rem",
    border: "2px solid #ef4444",
    backgroundColor: "#fed7aa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  };

  const cutoutLeftStyle = {
    width: "24px",
    height: "24px",
    backgroundColor: "#ffffff",
    borderRight: "2px solid #ef4444",
    borderRadius: "0 12px 12px 0",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    left: "-12px",
  };

  const cutoutRightStyle = {
    width: "24px",
    height: "24px",
    backgroundColor: "#ffffff",
    borderLeft: "2px solid #ef4444",
    borderRadius: "12px 0 0 12px",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    right: "-12px",
  };

  const textStyle = {
    fontSize: "0.875rem",
    color: "#9ca3af",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
      }}
    >
      {/* @ts-ignore */}
      <div style={ticketContainerStyle}>
        {/* @ts-ignore */}
        <div style={cutoutLeftStyle}></div>
        {/* @ts-ignore */}
        <div style={cutoutRightStyle}></div>
        <p style={textStyle}>Valid until 01 February 2022</p>
      </div>
    </div>
  );
};

export default Ticket;
