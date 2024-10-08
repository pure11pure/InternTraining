import PropTypes from "prop-types";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col justify-center items-center w-full border p-5">
      <div className="flex flex-row">
        <h1 className="text-2xl font-bold pb-2">User Layout</h1>
      </div>
      <header className="text-xl font-bold bg-pink-300 w-full text-center text-white rounded my-2">
        Header
      </header>
      <main className="flex flex-col w-full justify-center items-center ">
        {children}
      </main>
      <footer className="text-xl font-bold bg-pink-300 w-full text-center text-white rounded my-2">
        Footer
      </footer>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
