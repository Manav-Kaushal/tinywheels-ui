import Button from "@components/Button";
import Modal from "@components/Modal";
import Table from "@components/Table";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import api from "@utils/api";
import { BrandType } from "@utils/types/Brand";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import AddBrandForm from "./AddBrandForm";

type Props = {
  user: any;
};

const BrandsView = ({ user }: Props) => {
  const [fetchingBrandsList, setFetchingBrandsList] = useState(false);
  const [deletingBrand, setDeletingBrand] = useState(false);
  const [brandsList, setBrandsList] = useState<{
    list: BrandType[];
    total: number;
  }>({ list: [], total: 0 });

  // Modals & Drawers
  const [addBrandModal, setAddBrandModal] = useState(false);

  const toggleAddBrandModal = (show: boolean, callback?: () => void) => {
    try {
      setAddBrandModal(show);
      if (callback) {
        callback();
      }
    } catch (error) {
      // Handle any errors that might occur during state update
      console.error("Error toggling add brand modal:", error);
    }
  };

  const columns: any = useMemo(
    () => [
      {
        Header: "Logo",
        accessor: (row: BrandType) => {
          return (
            <div className="relative w-12 aspect-square">
              <Image
                src={row.logo || ""}
                alt={row.name}
                className="object-contain p-1 border rounded-md"
                fill
              />
            </div>
          );
        },
      },
      {
        Header: "Name",
        accessor: (row: BrandType) => {
          return (
            <>
              <p className="duration-300 cursor-pointer line-clamp-1 hover:text-primary">
                {row.name}
              </p>
              <p>{row._id}</p>
            </>
          );
        },
      },
      {
        Header: "Country",
        accessor: (row: BrandType) => {
          return <p className="line-clamp-1">{row.country}</p>;
        },
      },
      {
        Header: "Year Founded",
        accessor: (row: BrandType) => {
          return <p>{row.yearFounded}</p>;
        },
      },
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
                onClick={() => handleBrandDelete(row._id)}
              />
            </div>
          );
        },
      },
    ],
    []
  );

  const fetchAllBrands = useCallback(() => {
    setFetchingBrandsList(true);
    api
      .get("/brands")
      .then((res: any) => {
        setBrandsList(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setFetchingBrandsList(false);
      });
  }, []);

  const handleBrandDelete = async (id: string) => {
    setDeletingBrand(true);

    try {
      const response: any = await api.delete("/brands/" + id);

      if (response.ok) {
        toast.success("Brand deleted successfully!");
        fetchAllBrands();
      } else {
        const errorMessage = response?.data?.message || "Something went wrong";
        toast.error(`Brand could not be deleted! Error: ${errorMessage}`);
        console.error("Brand deletion error:", errorMessage);
      }
    } catch (error) {
      toast.error(
        "An error occurred while deleting the brand. Check console for more details."
      );
      console.error("Error deleting brand:", error);
    } finally {
      setDeletingBrand(false);
    }
  };

  useEffect(() => {
    fetchAllBrands();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between ">
        <div>
          <h4 className="font-medium text-primary-600">
            Total: {brandsList.total}
          </h4>
        </div>
        <div className="flex items-center space-x-2">
          <Button label="Refresh" onClick={() => fetchAllBrands()} size="sm" />
          <Button
            label="Add"
            size="sm"
            onClick={() => {
              toggleAddBrandModal(true);
            }}
          />
        </div>
      </div>

      <div className="mt-6">
        <Table
          columns={columns}
          data={brandsList?.list || []}
          loading={fetchingBrandsList || deletingBrand}
        />
      </div>

      <Modal
        title="Add brand"
        open={addBrandModal}
        onClose={() => toggleAddBrandModal(false)}
      >
        <AddBrandForm
          token={user?.token}
          toggleAddBrandModal={toggleAddBrandModal}
          fetchAllBrands={fetchAllBrands}
        />
      </Modal>
      {/*  <Drawer
        title="Brand Details"
        open={detailsPanelVisible}
        size="lg"
        onClose={() => hideBrandDetailsPanel()}
      >
        <DetailsPanel brand={brandDetails} />
      </Drawer> */}
    </div>
  );
};

export default BrandsView;
