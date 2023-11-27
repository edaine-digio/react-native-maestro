/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

export const enum ENDPOINT {
  POSTS = '/posts',
}

export const enum API_STATE {
  LOADING = 0,
  SUCCESS = 1,
  ERROR = -1,
}

export interface Post {
  author: string;
  content: string;
  postDate: string;
}

export const useMantelPieceApi = () => {
  const BASE_URL =
    'https://firestore.googleapis.com/v1/projects/mg-rn-training-new/databases/(default)/documents';

  const [apiState, setState] = useState<API_STATE>(API_STATE.LOADING);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [jsonData, setJsonData] = useState<any | null>(null);

  const fetchPosts = async () => {
    setState(API_STATE.LOADING);
    await new Promise(resolve => setTimeout(resolve, 3000));
    const response = await fetch(BASE_URL + ENDPOINT.POSTS);

    if (response.ok) {
      setState(API_STATE.SUCCESS);
      setJsonData(parseResponse(await response.json()));
    } else {
      setState(API_STATE.ERROR);
    }
  };

  const createPost = async (content: string) => {
    setState(API_STATE.LOADING);
    await new Promise(resolve => setTimeout(resolve, 3000));
    const response = await fetch(BASE_URL + ENDPOINT.POSTS, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          author: { stringValue: 'Edaine Paz' },
          content: { stringValue: content },
          postDate: { timestampValue: new Date() },
        },
      }),
    });

    if (response.ok) {
      setState(API_STATE.SUCCESS);
    } else {
      setState(API_STATE.ERROR);
      console.log(
        'failed creating a new post: ' +
          response.status +
          ' ' +
          response.json.toString(),
      );
    }
  };

  return { fetchPosts, createPost, apiState, jsonData };
};

const parseResponse = (response: any) => {
  const parsedPosts = response.documents.map(
    (element: {
      fields: {
        author: { stringValue: any };
        content: { stringValue: any };
        postDate: { timestampValue: any };
      };
    }) => {
      return {
        author: element.fields.author.stringValue,
        content: element.fields.content.stringValue,
        postDate: element.fields.postDate.timestampValue,
      };
    },
  );

  return sortPosts(parsedPosts);
};

const sortPosts = (posts: any[]) => {
  const sortedPosts = [...posts].sort(
    (e1, e2) =>
      new Date(e2.postDate).getTime() - new Date(e1.postDate).getTime(),
  );

  return sortedPosts;
};
