import { CustomIconComponentProps } from "@/etc/types";
import Icon from "@ant-design/icons";

function BitBucket() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 1024 1024"
    >
      <circle cx="512" cy="512" r="512" fill="#0052cc"></circle>
      <path
        fill="#fff"
        d="M272.6 281.9c-9-.1-16.5 7.1-16.6 16.2 0 1 0 1.9.2 2.9l69.6 422.6c1.8 10.6 11 18.5 21.8 18.6h334c8.1.1 15.1-5.8 16.4-13.8L767.8 301c1.5-8.9-4.6-17.3-13.5-18.8-1-.2-1.9-.2-2.8-.2l-478.9-.1zm293.2 305.4H459.1l-28.8-150.7h161.3l-25.8 150.7z"
      ></path>
    </svg>
  );
}

export default function BitBucketIcon(
  props: Partial<CustomIconComponentProps>
) {
  return <Icon component={BitBucket} {...props} />;
}
