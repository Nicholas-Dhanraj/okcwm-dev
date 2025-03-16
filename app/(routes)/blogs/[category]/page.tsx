"use client";

import PostList from "@/app/_components/PostList";
import GlobalApi from "@/app/_services/GlobalApi";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import BlogMain from "../_components/BlogMain";
import BlogInfo from "../_components/BlogInfo";

const PostByTopic = ({ params }: any) => {
  const [postList, setPostList] = useState([]);
  const [post, setPost] = useState([]);

  const params1: any = usePathname();
  useEffect(() => {
    console.log(params);
    params && getPostById();
  }, [params]);

  const getPostById = () => {
    GlobalApi.getPostById(params.category).then((resp: any) => {
      setPost(resp.post);
    });
  };

  const getPostList = () => {
    GlobalApi.getPostByCategory(params.category).then((res: any) => {
      setPostList(res?.posts);
      console.log("HERE12");

      // console.log(params);
    });
  };
  useEffect(() => {
    params1 && setSelectedTopic(params1.split("/")[2]);
  }, [params1]);
  const [selectedTopic, setSelectedTopic] = useState();

  const [topicList, setTopicList] = useState([]);
  const [postList1, setPostList1] = useState([]);

  useEffect(() => {
    getTopicList();
    getAllPostList();
  }, []);
  const getTopicList = () => {
    GlobalApi.getTopic().then((resp: any) => {
      setTopicList(resp.topics);
    });
  };

  const getAllPostList = () => {
    GlobalApi.getAllPostList().then((resp: any) => {
      setPostList1(resp.posts);
    });
  };
  return (
    post && (
      <div
        className="py-0 lg:py-20
    px-10 md:px-36"
      >
        <BlogInfo blog={post} />

        <div>
          <div className="grid grid-cols-1 mt-16 pr-0 md:pr-20 pl-0 md:pl-20">
            <div className="col-span-3 md:col-span-2 order-last md:order-first">
              <BlogMain blog={post} />
            </div>
            <div className="">
              {/* <SuggestedBusinessList business={business} /> */}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default PostByTopic;
