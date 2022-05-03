export default function Image(props) {
  const { src, alt, onClick, disabled, cls } = props;
  return (
    <div
      onClick={() => (disabled || !onClick ? false : onClick())}
      className={`${cls} ${(!disabled || onClick) && "cursor-pointer"}`}
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
