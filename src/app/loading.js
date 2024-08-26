import Image from "next/image";

const loading = () => {
  return (
    <div className=" dark:bg-dark bg-white w-full h-screen flex justify-center items-center">
      <Image
        src="/images/Spinner.svg"
        width={100}
        height={100}
        className="animate-bounce"
        alt="Loading Logo"
        priority
      />
    </div>
  );
};

export default loading;
