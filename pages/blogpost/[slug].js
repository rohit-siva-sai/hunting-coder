import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/BlogPost.module.css";
import * as fs from "fs";

const Slug = (props) => {
  function createMarkup(c) {
    return { __html: c };
}

  const [blog, setBlog] = useState(props.myBlog);

  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    const { slug } = router.query;
    console.log("use effect is running");
    fetch(`http://localhost:3000/api/getblog?slug=${slug}`)
      .then((a) => {
        return a.json();
      })
      .then((parsed) => {
        setBlog(parsed);
      });
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>{blog && blog.title}</h1>

        <hr />
       {blog &&  <div dangerouslySetInnerHTML={createMarkup(blog.content)}></div> }
      </main>
    </div>
  );
};

// pages/posts/[id].js

// Generates `/posts/1` and `/posts/2`
export async function getStaticPaths() {
  return {
    paths: [
      
      
     
      // { params: { slug: "learn-javahwjbd"} },
      // { params: { slug: "learn-javasndjhba"} },
      // { params: { slug: "learn-javabd"} },
      // { params: { slug: "learn-javahgdvcgh"} },
      // { params: { slug: "learn-javadwcv"} },
      { params: { slug: "learn-java"} },
      // { params: { slug: "learn-nexthgsxvd"} },
      // { params: { slug: "learn-nextwdhgcve"} },
      // { params: { slug: "learn-nextshgwxv"} },
      // { params: { slug: "learn-nextwdhgv"} },
      // { params: { slug: "learn-nextwhgdv"} },
      { params: { slug: "learn-next"} },
      { params: { slug: "learn-reacthdcxhg"} },
      { params: { slug: "learn-reacthgwvxh"} },
      { params: { slug: "learn-reacthgwvshg"} },
      { params: { slug: "learn-reactwegvjkw"} },
      { params: { slug: "learn-reactwhgevhgw"} },
      { params: { slug: "learn-react"} },
     
  ],
    fallback: true, 
  }
}

export async function getStaticProps(context) {
  // console.log(context);

  
  const { slug } = context.params;
 
  
   let myBlog =  await fs.promises.readFile(`blogdata/${slug}.json`, "utf-8");
  //  myBlog = (JSON.parse(myBlog));
  // let data = await fetch(`http://localhost:3000/api/getblog?slug=${slug}`);
  // let myBlog = await data.json();
  return {

         props: { myBlog: JSON.parse(myBlog) },
  }
}




// export async function getServerSideProps(context) {
//   let { slug } = context.query;
//   let data = await fetch(`http://localhost:3000/api/getblog?slug=${slug}`)
//   let myBlog = await data.json();
//   return {
//     props: {myBlog}, // will be passed to the page component as props
//   }
// }

export default Slug;
