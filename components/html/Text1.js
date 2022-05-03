export default function Text(props) {
  const { title, cls } = props;
  return <p className={cls}>{title}</p>;
}
