import Image from "next/image";
import Link from "next/link";

type Props = {
  imgUrl: string;
  alt: string;
  value: string | number;
  title: string;
  href?: string;
  textStyle?: string;
  isAuthor?: boolean;
};

const Metrics = ({
  imgUrl,
  alt,
  value,
  title,
  href,
  textStyle,
  isAuthor,
}: Props) => {
  const metricsContent = (
    <>
      <Image
        src={imgUrl}
        alt={alt}
        width={16}
        height={16}
        className={`object-contain ${href ? "rounded-full" : ""}`}
      />
      <p className={`${textStyle} flex items-center gap-1`}>
        <span>{value}</span>
        <span
          className={`small-regular line-clamp-1 ${
            isAuthor ? "max-sm:hidden" : ""
          }`}
        >
          {title}
        </span>
      </p>
    </>
  );

  if (href) {
    return (
      <Link className="flex-center gap-1" href={href}>
        {metricsContent}
      </Link>
    );
  }
  return <div className="flex-center gap-1">{metricsContent}</div>;
};

export default Metrics;
