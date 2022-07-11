import { gql } from "@apollo/client";

export const LOAD_USERS = gql`
  query {
    users {
      name
      id
      transactionType
      status
      date
    }
  }
`;
