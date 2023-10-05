import { gql, GraphQLClient } from "graphql-request";

const graphqlAPI = process.env.NEXT_GRAPHCMS_ENDPOINT;

// 最新方法, 不用单独从graphql-request导入request方法
const graphQLClient = new GraphQLClient(graphqlAPI, {
  headers: {
    authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
  },
});
// 获取作者信息(因为是我的博客, 所以id就此固定)
export const getAuthor = async () => {
  const query = gql`
    query GetAuthor {
      author(where: { id: "clmuniup30umw0b18v5jbpt4x" }) {
        bio
        name
        id
        photo {
          url
        }
      }
    }
  `;
  const res = await graphQLClient.request(query, {
    id: "clmuniup30umw0b18v5jbpt4x",
  });
  return res.author;
};

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
          html
          json
          text
          markdown
        }
        categories {
          name
          slug
        }
      }
    }
  `;
  const res = await graphQLClient.request(query, { slug: slug });
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
        last: 4
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
  const res = await graphQLClient.request(query, {
    slug: slug,
    categories: categories,
  });
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

// 获取所有指定类型的博客
export const getCategoriesAll = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: { categories_some: { slug: $slug } }) {
        edges {
          cursor
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

  const res = await graphQLClient.request(query, { slug: slug });
  console.log(res.postsConnection.edges);
  return res.postsConnection.edges;
};

// 提交评论
export const submitComment = async (obj) => {
  try {
    const query = gql`
      mutation CreateComment(
        $name: String!
        $email: String!
        $comment: String!
        $slug: String!
      ) {
        createComment(
          data: {
            name: $name
            email: $email
            comment: $comment
            post: { connect: { slug: $slug } }
          }
        ) {
          #只需要返回id
          id
        }
      }
    `;
    const res = await graphQLClient.request(query, {
      name: obj.name,
      email: obj.email,
      comment: obj.comment,
      slug: obj.slug,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

// 获取评论
export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        createdAt
        comment
      }
    }
  `;
  const res = await graphQLClient.request(query, {
    slug: slug,
  });
  return res.comments;
};
