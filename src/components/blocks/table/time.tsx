import moment from "moment";

export default function TableItemTime({
  value,
  options,
  className,
}: {
  value: number;
  options?: any;
  className?: string;
}) {
  return (
    <div className={className}>
      {options?.format
        ? moment(value).format(options?.format)
        : moment(value).fromNow()}
    </div>
  );
}
