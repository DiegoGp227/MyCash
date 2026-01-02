interface IbuttonChangeAuth {
  login: boolean;
  onClick: () => void;
}

export default function ButtonChangeAuth({
  login,
  onClick,
}: IbuttonChangeAuth) {
  return (
    <button
      className="
    group mt-4 text-sm text-center
    transition-colors duration-200
    cursor-pointer
  "
      onClick={onClick}
    >
      <span className="text-light-muted dark:text-dark-muted text-hard-gray">
        {login ? "¿Do you have an account?" : "¿Don't have an account?"}
      </span>{" "}
      <span
        className="
      font-medium text-primary-purple
      group-hover:underline
    "
      >
        {login ? "¡Create one here!" : "¡Log in!"}
      </span>
    </button>
  );
}
