import PropTypes from "prop-types";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <header>Header</header>
      <main className="flex flex-col w-full justify-center items-center ">{children}</main>
      <footer>Footer</footer>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
