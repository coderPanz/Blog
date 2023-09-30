import { gql, GraphQLClient } from "graphql-request";

// 最新方法, 不用单独从graphql-request导入request方法
const graphQLClient = new GraphQLClient(
  "https://api-ap-northeast-1.hygraph.com/v2/clmulqpso058501t8fvvt1utk/master"
);

// 获取主页帖子所需的数据
export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;
  const res = await graphQLClient.request(query);
  return res.postsConnection.edges;
};

// 获取slug指定的帖子
export const getAppointPost = async (slug) => {
  const query = gql`
    query AppointPostQuery($slug: String!) {
      post(where: { slug: $slug }) {
        title
        excerpt
        featuredImage {
          url
        }
        author {
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          text
        }
        categories {
          name
          slug
        }
      }
    }
  `;
  const res = await graphQLClient.request(query, { slug });
  return res.post;
};

// 获取最近帖子的数据
export const getRecentPosts = async () => {
  const query = gql`
    query MyQuery {
      posts(last: 4, orderBy: createdAt_ASC) {
        title
        slug
        featuredImage {
          url
        }
        createdAt
        author {
          name
        }
      }
    }
  `;
  const res = await graphQLClient.request(query);
  return res.posts;
};

// 获取最近与slug相关类型的帖子
export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query MyQuery($slug: String!, $categories: [String!]) {
      posts(
        # where 参数用于过滤查询结果
        # slug_not 表示排除掉指定的数据
        # AND 用于将多个条件组合在一起。
        # categories_some 表示查询指定分类的帖子，这里使用变量 $categories 将实际的值传递进去。
        where: {
          slug_not: "$slug"
          AND: { categories_some: { slug_in: "categories" } }
        }
        last: 3
      ) {
        title
        slug
        createdAt
        featuredImage {
          url
        }
      }
    }
  `;
  const res = await graphQLClient.request(query);
  return res.posts;
};

// 获取帖子类型的数据
export const getCategories = async () => {
  const query = gql`
    query MyQuery {
      categories {
        name
        slug
      }
    }
  `;
  const res = await graphQLClient.request(query);
  return res.categories;
};
