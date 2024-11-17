import { apiSlice } from "./apiSlice";
import { ORDERS_URL, PAYPAL_URL, USERS_URL } from "../constants";

// Modify the API slice to handle both mutations and queries (with authentication token if required)
export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: order,
        credentials: "include",
        // Add headers if you need to pass the token for authentication
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userInfo")}`, // Assuming token is stored in localStorage
        },
      }),
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userInfo")}`, // Add token if needed
        },
      }),
      keepUnusedDataFor: 5, // Keep cache for 5 seconds
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: details,
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userInfo")}`, // Add token if needed
        },
      }),
    }),
    getPayPalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userInfo")}`, // Add token if needed
        },
      }),
      keepUnusedDataFor: 5,
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/mine`,
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userInfo")}`, // Add token if needed
        },
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userInfo")}`, // Add token if needed
        },
      }),
      keepUnusedDataFor: 5,
    }),
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: "PUT",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userInfo")}`, // Add token if needed
        },
      }),
    }),
  }),
});

// Export hooks for the defined endpoints
export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation,
} = ordersApiSlice;
