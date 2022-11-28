import Link from "next/link";
import React, { useState } from "react";
import styles from "../styles/Blog.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import * as fs from "fs";

const Blog = (props) => {
  // console.log(props);

  const [blogs, setBlogs] = useState(props.allblogs);
  const [count,setCount] = useState(7);
  // useEffect(() => {
  //   console.log("use effect is running");
  //   fetch("http://localhost:3000/api/blogs")
  //     .then((a) => {
  //       return a.json();
  //     })
  //     .then((parsed) => {
  //       // parsed = data.json()
  //       // console.log(parsed);
  //       setBlogs(parsed);
  //     });
  // }, []);
  const  fetchData = async () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    // setTimeout(() => {
    //   this.setState({
    //     items: this.state.items.concat(Array.from({ length: 20 }))
    //   });
    // }, 1500);
    
      let d =  await fetch(`http://localhost:3000/api/blogs/?count=${count + 2}`)
      setCount(count + 2)
      let data =  await d.json()
      setBlogs(data)
    console.log('function calling');
    
  
  };

  return (
    <div className={styles.container}>
        <main className={styles.main}>
        {/* {console.log(blogs)} */}

        {console.log('this is main')}
        <InfiniteScroll
        
          dataLength={blogs.length} //This is important field to render the next data
          next={fetchData}
          hasMore={props.allCount !== blogs.length}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          // // below props only if you need pull down functionality
          // refreshFunction={this.refresh}
          // pullDownToRefresh
          // pullDownToRefreshThreshold={50}
          // pullDownToRefreshContent={
          //   <h3 style={{ textAlign: "center" }}>
          //     &#8595; Pull down to refresh
          //   </h3>
          // }
          // releaseToRefreshContent={
          //   <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
          // }
          
        >
      
       

        {blogs.map((blogitem) => {
          return (
            <div key={blogitem.slug}>
              <Link href={`/blogpost/${blogitem.slug}`}>
                <h3 className={styles.blogItem}>{blogitem.title}</h3>
              </Link>
              <p className={styles.blogItemp}>
                {blogitem.metadesc.substr(0, 140)}...
              </p>
            </div>
          );
        })}
        </InfiniteScroll>
      </main>
    </div>
  );
};

export async function getStaticProps(context) {
  let data = await fs.promises.readdir("blogdata");
  let allCount = data.length;
  let myfile;
  let allblogs = [];
  for (let index = 0; index < data.length; index++) {
    const item = data[index];
    // console.log(item);
    myfile = await fs.promises.readFile(`blogdata/` + item, "utf-8");
    // console.log(myfile);
    allblogs.push(JSON.parse(myfile));
  }
  // let data = await fetch("http://localhost:3000/api/blogs")
  // let allBlogs = await data.json();
  return {
    props: { allblogs,allCount }, // will be passed to the page component as props
  };
}

export default Blog;
