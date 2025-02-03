function Footer() {
  return (
    <footer className="page-footer green lighten-4">
      <div className="footer-copyright">
        <div className="container">
          © {new Date().getFullYear()} Copyright Text
          <a
            className="grey-text text-lighten-4 right"
            href="https://github.com/lemon1964/react-shop"
            rel="noreferrer"
            target="_blank"
          >
            Repo
          </a>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
