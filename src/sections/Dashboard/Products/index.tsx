import Button from "@components/Button";
import Table from "@components/Table";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import api from "@utils/api";
import { ProductViews } from "@utils/enums/Product";
import { formatCurrency } from "@utils/helpers";
import useQuery from "@utils/hooks/useQuery";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import AddProductForm from "./AddProductForm";

type Props = { user: any };

const ProductsView = ({ user }: Props) => {
  const [query, updateQuery, removeQuery] = useQuery();
  const [fetchingProductsList, setFetchingProductsList] = useState(false);
  const [productsList, setProductsList] = useState<{
    list: any[];
    total: number;
  }>({
    list: [],
    total: 0,
  });
  const [view, setView] = useState(ProductViews.LIST);

  const toggleAddProductModal = (
    value: ProductViews,
    callback?: () => void
  ) => {
    try {
      setView(value);
      if (callback) {
        callback();
      }
    } catch (error) {
      console.error("Error toggling view for products:", error);
    }
  };

  const columns: any = useMemo(
    () => [
      {
        Header: "Thumbnail",
        accessor: (row: any) => {
          return (
            <Image
              src={row.images[0]}
              alt={row.title}
              width={75}
              height={75}
              className="object-contain p-1 border rounded-md aspect-1"
            />
          );
        },
      },
      {
        Header: "Name",
        accessor: (row: any) => {
          return (
            <p className="duration-300 cursor-pointer line-clamp-1 hover:text-primary-600">
              {row.title}
            </p>
          );
        },
      },
      {
        Header: "Brand",
        accessor: (row: any) => {
          return <p>{row.brand.name}</p>;
        },
      },
      {
        Header: "Price",
        accessor: (row: any) => {
          return <p>{formatCurrency(row.price || 0)}</p>;
        },
      },
      {
        Header: "Category",
        accessor: (row: any) => {
          return <p>{row.category}</p>;
        },
      },
      {
        Header: "3D Model",
        accessor: (row: any) => {
          return (
            <>
              {row.threeDFile ? (
                <CheckCircleIcon className="w-5 h-5 text-green-500" />
              ) : (
                <XCircleIcon className="w-5 h-5 text-red-500" />
              )}
            </>
          );
        },
      },
      {
        Header: "Qty.",
        accessor: (row: any) => {
          return <p>{row.stockQuantity}</p>;
        },
      },
      {
        Header: "Featured",
        accessor: (row: any) => {
          return (
            <>
              {row.isFeatured == true ? (
                <CheckCircleIcon className="w-5 h-5 text-green-500" />
              ) : (
                <XCircleIcon className="w-5 h-5 text-red-500" />
              )}
            </>
          );
        },
      },
      // {
      //   Header: "Created",
      //   accessor: (row: ProductType) => {
      //     return (
      //       <p>
      //         {row.createdAt
      //           ? formatDate({ date: row.createdAt, includeTime: true })
      //           : "-"}
      //       </p>
      //     );
      //   },
      // },
      {
        Header: "Actions",
        accessor: (row) => {
          return (
            <div className="flex items-center space-x-2 text-sm cursor-default">
              <PencilSquareIcon
                className="w-5 h-5 cursor-pointer text-primary/75 hover:text-primary transition__300"
                // onClick={() => triggerEditCategoryDrawer(row)}
              />
              <span>|</span>
              <TrashIcon
                className="w-5 h-5 cursor-pointer text-red-500/75 hover:text-red-500 transition__300"
                // onClick={() => handleDelete(row._id)}
              />
            </div>
          );
        },
      },
    ],
    []
  );

  const fetchAllProducts = useCallback(() => {
    api
      .get("/products?admin=true")
      .then((res: any) => {
        setProductsList((prev) => ({ ...prev, list: res.data }));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setFetchingProductsList(false);
      });
  }, []);

  useEffect(() => {
    setFetchingProductsList(true);
    fetchAllProducts();
  }, []);

  // Conditionally render components based on the query parameters
  const renderComponent = () => {
    if (query.newEntry) {
      return (
        <AddProductForm
          token={user?.token}
          fetchAllProducts={fetchAllProducts}
        />
      );
    } else {
      return <Table columns={columns} data={productsList?.list || []} />;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between ">
        <div>
          <h4 className="font-semibold text-primary/50">
            {/* Total Categories: {total} */}
            {query?.newEntry && (
              <div
                className="flex items-center space-x-2 font-normal duration-200 cursor-pointer hover:text-primary-600"
                onClick={() => removeQuery("newEntry")}
              >
                <ArrowLeftIcon className="w-4 h-4 mr" />
                <p>Back</p>
              </div>
            )}
          </h4>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            label="Refresh"
            onClick={() => {
              fetchAllProducts();
            }}
            size="sm"
          />
          <Button
            label="Add"
            size="sm"
            onClick={() => updateQuery({ newEntry: "true" })}
          />
        </div>
      </div>

      <div className="mt-6">{renderComponent()}</div>

      {/* <Drawer
        title="Product Details"
        open={detailsPanelVisible}
        size="lg"
        onClose={() => hideProductDetailsPanel()}
      >
        <DetailsPanel product={productDetails} />
      </Drawer> */}
    </div>
  );
};

export default ProductsView;
