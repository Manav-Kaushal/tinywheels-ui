import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

type Query = ParsedUrlQuery;

type UpdateQueryFn = (updates: Partial<Query>) => void;
type RemoveQueryFn = (param: keyof Query) => void;

const useQuery = (): [Query, UpdateQueryFn, RemoveQueryFn] => {
  const router = useRouter();

  const updateQuery: UpdateQueryFn = (updates) => {
    const currentQuery = { ...router.query };
    const newQuery = { ...currentQuery, ...updates };
    router.push({ query: newQuery });
  };

  const removeQuery: RemoveQueryFn = (param) => {
    const currentQuery = { ...router.query };
    delete currentQuery[param];
    router.push({ query: currentQuery });
  };

  return [router.query, updateQuery, removeQuery];
};

export default useQuery;
