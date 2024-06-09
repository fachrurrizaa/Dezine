import React, { useContext } from "react";
import Link from "next/link";
import CategoryItem from "../../components/section/CategoryItem";
import { Context } from "../../components/context/MyContext";

const ListCategories = () => {
  const { categories, posts } = useContext(Context);

  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-12 py-8">
        {categories.map((category) => {
          const categoryPosts = posts.filter(
            (post) => post.category === category._id
          );
          const thumbnailUrl =
            categoryPosts.length > 0 ? categoryPosts[0].images[0] : "";
          const postCount = categoryPosts.length;

          return (
            <CategoryItem
              key={category._id}
              id={category._id}
              thumbnails={thumbnailUrl}
              name={category.name}
              random={Math.floor(Math.random() * 1000)}
              postCount={postCount}
            />
          );
        })}
    </div>
  );
};

export default ListCategories;
