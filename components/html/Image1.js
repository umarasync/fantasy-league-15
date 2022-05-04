export default function Image(props) {
  const { src, alt, onClick, disabled, className: cls } = props;

  const cursorPointer = !disabled && onClick ? "cursor-pointer" : "";
  const className = `${cls} ${cursorPointer}`;
  return (
    <div
      onClick={() => (disabled || !onClick ? false : onClick())}
      className={className}
    >
      <img
        src={`${src}`}
        alt={alt ? alt : "-"}
        width={"100%"}
        height={"100%"}
      />
    </div>
  );
}
