import { auth } from "@/auth";
import BlogList from "@/components/common/BlogList";
import { getSearchResult, getUserByEmail } from "@/database/queries";

// Function to generate metadata for the search page, such as the page title
export async function generateMetadata({ params, searchParams }, parent) {
  const query = searchParams.query || ""; // Get the search query from URL parameters

  try {
    return {
      title: `Search result for "${query}"`, // Set the page title based on the search query
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
  }
}

// SearchPage component displays the search results based on the user's query input
const SearchPage = async ({ searchParams }) => {
  const query = searchParams.query || ""; // Extract the search query from URL parameters

  // Fetch search results for the query from the database
  const searchBlogs = await getSearchResult(query);

  // Authenticate the user and fetch the user information based on email
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email);

  return (
    <div className="px-5 pt-5 bg-gray-100 dark:bg-[#181818]">
      {query && (
        // Display a message showing the current search query
        <h2 className="bg-white dark:bg-dark mb-5 p-5 dark:text-gray-100 rounded-md">
          Showing result for &#34;
          <span className="text-primary font-semibold"> {query} </span>
          &#34;
        </h2>
      )}
      {/* Render the list of blogs based on search results */}
      <BlogList blogs={searchBlogs} user={user} />
    </div>
  );
};

export default SearchPage;
