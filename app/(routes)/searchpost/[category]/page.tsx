"use client";

import PostList from "@/app/_components/PostList";
import GlobalApi from "@/app/_services/GlobalApi";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const PostByTopic = ({ params }: any) => {
  const [postList, setPostList] = useState([]);
  const [post, setPost] = useState([]);

  const params1: any = usePathname();
  useEffect(() => {
    console.log("HERE");

    console.log(params);
    params && getPostList();
  }, [params]);

  const getbusinessById = () => {
    GlobalApi.getPostById(params.businessId).then((resp: any) => {
      setPost(resp.businessList);
    });
  };

  const getPostList = () => {
    GlobalApi.getPostByCategory(params.category).then((res: any) => {
      setPostList(res?.posts);
      console.log("HERE1");

      console.log(params);
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
    <div>
      {selectedTopic == "Pinned" ? (
        <PostList postList={setPostList1} title="All Blogs" />
      ) : (
        <PostList title={params.category} postList={postList} />
      )}
    </div>
  );
};

export default PostByTopic;
