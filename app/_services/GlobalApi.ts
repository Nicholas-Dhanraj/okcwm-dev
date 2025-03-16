import request, { gql } from "graphql-request";

const MASTER_URL =
  "https://api-ca-central-1.hygraph.com/v2/" +
  process.env.NEXT_PUBLIC_MASTER_URL +
  "/master";

const getCategory = async () => {
  const query = gql`
    query Category {
      categories {
        bgColor {
          hex
          rgba {
            a
            b
            g
            r
          }
        }
        id
        name
        icon {
          url
        }
      }
    }
  `;

  const res = await request(MASTER_URL, query);
  return res;
};

const getTopic = async () => {
  const query = gql`
    query Topic {
      topics {
        id
        name
      }
    }
  `;

  const res = await request(MASTER_URL, query);
  return res;
};

const getTimeOffs = async () => {
  const query = gql`
    query MyQuery {
      timeOffs {
        from
        to
      }
    }
  `;

  const res = await request(MASTER_URL, query);
  return res;
};

// query Topic {
//       topics {
//         id
//         name
//       }
//     }

const getAllBusinessList = async () => {
  const query = gql`
    query MyQuery {
      businessLists {
        about
        address
        category {
          bgColor {
            hex
            rgba {
              a
              b
              g
              r
            }
          }
          name
        }
        contactPerson
        email
        images {
          url
        }
        id
        name
      }
    }
  `;

  const res = await request(MASTER_URL, query);
  return res;
};

const getAllPostList = async () => {
  const query = gql`
    query MyQuery {
      posts {
        body {
          html
        }
        topics {
          name
        }
        images {
          url
        }
        id
        name
        readTime
      }
    }
  `;

  const res = await request(MASTER_URL, query);
  return res;
};

const getBusinessByCategory = async (category: string) => {
  const query =
    gql`
    query MyQuery {
      businessLists(where: { category: { name: "` +
    category +
    `" } }) {
           about
        address
        category {
          bgColor {
          hex
          rgba {
            a
            b
            g
            r
          }
        }
          name
        }
        contactPerson
        email
        id
        name
        images {
          url
        }
      }
    }
  `;

  const res = await request(MASTER_URL, query);
  return res;
};

const getPostByCategory = async (topic: string) => {
  const query =
    gql`
    query MyQuery {
      posts(where: { topic: { name: "` +
    topic +
    `" } }) {
        body {
          html
        }
        topics {
          name
        }
        images {
          url
        }
        id
        name
        readTime
      }
    }
  `;

  const res = await request(MASTER_URL, query);
  return res;
};

const getBusinessById = async (id: string) => {
  const query =
    gql`
    query getBusinessById {
      businessList(where: { id: "` +
    id +
    `" }) {
        about
        address
        category {
          name
        }
        contactPerson
        email
        id
        name
        images {
          url
        }
      }
    }
  `;

  const res = await request(MASTER_URL, query);
  return res;
};

const getPostById = async (id: string) => {
  const query =
    gql`
    query getPostById {
      post(where: { id: "` +
    id +
    `" }) {
     body {html}
        topic {
          name
        }
        readTime
        subheading
        id
        name
        image {url}
        images {
          url
        }
      }
    }
  `;

  const res = await request(MASTER_URL, query);
  return res;
};

const createNewBooking = async (
  businessId: string,
  date: any,
  time: string,
  userEmail: string,
  userName: string
) => {
  const mutationQuery =
    gql`
  mutation CreateBooking {
    createBooking(
      data: {bookingStatus: Booked, 
        businessList: {connect: {id: "` +
    businessId +
    `"}},
         date: "` +
    date +
    `", time: "` +
    time +
    `", 
         userEmail: "` +
    userEmail +
    `",
          userName: "` +
    userName +
    `"}
    ) {
      id
    }
    publishManyBookings(to: PUBLISHED) {
      count
    }
  }
  `;
  const result = await request(MASTER_URL, mutationQuery);
  return result;
};

const createTimeOff = async (from: string, to: any) => {
  const mutationQuery =
    gql`
    mutation CreateTimeOff {
      createTimeOff(
        data: {
          from: "` +
    from +
    `"
          to: "` +
    to +
    `"
        }
      ) {
        id
      }
       publishManyTimeOffs(to: PUBLISHED) {
      count
    }
    }
  `;
  const result = await request(MASTER_URL, mutationQuery);
  return result;
};

const BusinessBookedSlot = async (businessId: String, date: any) => {
  const query =
    gql`
  query BusinessBookedSlot {
    bookings(where: {businessList: 
      {id: "` +
    businessId +
    `"}, date: "` +
    date +
    `"}) {
      date
      time
    }
  }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const GetUserBookingHistory = async (userEmail: string) => {
  const query =
    gql`
  query GetUserBookingHistory {
    bookings(where: {userEmail: "` +
    userEmail +
    `"}
    orderBy: publishedAt_DESC) {
      businessList {
        name
        images {
          url
        }
        contactPerson
        address
      }
      date
      time
      id
    }
  }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const deleteBooking = async (bookingId: any) => {
  const mutationQuery = gql`
    mutation DeleteBooking {
      updateBooking(
        data: { userName: "RRRS" }
        where: { id: "cltastwp36re707jzb02sgdlm" }
      ) {
        id
      }
    }
  `;

  const result = await request(MASTER_URL, mutationQuery);
  return result;
};
export default {
  getCategory,
  getTopic,
  getTimeOffs,
  getAllBusinessList,
  getAllPostList,
  getBusinessByCategory,
  getPostByCategory,
  getBusinessById,
  getPostById,
  createNewBooking,
  BusinessBookedSlot,
  GetUserBookingHistory,
  createTimeOff,
  deleteBooking,
};
