"use client";

import { useRouter } from "next/navigation";

const CreateBlogForm = () => {
  const router = useRouter();

  const redirectToCreateBlog = () => {
    router.push("/blog/create");
  };

  return (
    <div className="relative mx-5 mb-5 bg-white dark:bg-dark rounded-lg p-2 pt-5">
      <div className="absolute px-2 top-0 -left-[0] bg-primary  rounded-tl-lg rounded-br-lg">
        <h2 className="font-semibold text-white">Discussion</h2>
      </div>
      <form>
        <div className="w-full px-3 mb-2 mt-6">
          <textarea
            onFocus={redirectToCreateBlog}
            className="bg-gray-100 dark:bg-zinc-950 text-gray-900 rounded border border-primary leading-normal w-full h-20 p-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white"
            name="body"
            placeholder="What&#39;s on your mind"
            required=""
            defaultValue={""}
          />
        </div>
        <div className="w-full flex justify-end px-3 my-3">
          <button className="px-2.5 py-1.5 rounded-md text-white text-sm bg-primary md:text-lg">
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlogForm;
