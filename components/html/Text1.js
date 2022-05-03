export default function Text(props) {
  const { title, className } = props;
  return <p className={className}>{title}</p>;
}
