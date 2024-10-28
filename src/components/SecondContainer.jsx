const SecondContainer = ({ children }) => {
  return (
    <div
      className="px-2 d-flex flex-column bg-body-tertiary rounded mx-auto"
      style={{
        width: "600px",
      }}
    >
      {children}
    </div>
  );
};

export default SecondContainer;
