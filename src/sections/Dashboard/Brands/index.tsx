import Button from "@components/Button";
import CopyToClipboard from "@components/CopyToClipboard";
import Drawer from "@components/Drawer";
import Modal from "@components/Modal";
import Table from "@components/Table";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import api from "@utils/api";
import { trimID } from "@utils/helpers";
import { BrandType } from "@utils/types/Brand";
import dayjs from "dayjs";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import AddBrandForm from "./AddBrandForm";
import EditBrandForm from "./EditBrandForm";

type Props = {
  user: any;
};

const BrandsView = ({ user }: Props) => {
  const [fetchingBrandsList, setFetchingBrandsList] = useState<boolean>(false);
  const [deletingBrand, setDeletingBrand] = useState<boolean>(false);
  const [brandsList, setBrandsList] = useState<{
    list: BrandType[];
    total: number;
  }>({ list: [], total: 0 });
  const [brandToEditId, setBrandToEditId] = useState<string>("");

  // Modals & Drawers
  const [addBrandModal, setAddBrandModal] = useState(false);
  const [editBrandDrawer, setEditBrandDrawer] = useState(false);

  const toggleAddBrandModal = (value: boolean, callback?: () => void) => {
    try {
      setAddBrandModal(value);
      if (callback) {
        callback();
      }
    } catch (error) {
      console.error("Error toggling add brand modal:", error);
    }
  };

  const toggleEditBrandDrawer = (value: boolean, callback?: () => void) => {
    try {
      setEditBrandDrawer(value);
      if (callback) {
        callback();
      }
    } catch (error) {
      console.error("Error toggling edit brand drawer:", error);
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
          return <p className="line-clamp-1">{row.name}</p>;
        },
      },
      {
        Header: "ID",
        accessor: (row: BrandType) => {
          return (
            <div>
              <span>{trimID(row._id)}</span>
              <CopyToClipboard textToCopy={row._id} message="ID Copied" />
            </div>
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
          return <p>{dayjs(row.yearFounded).format("MMM DD, YYYY")}</p>;
        },
      },
      {
        Header: "Actions",
        accessor: (row) => {
          return (
            <div className="flex items-center space-x-2 text-sm cursor-default">
              <PencilSquareIcon
                className="w-5 h-5 duration-200 cursor-pointer text-primary-600/50 hover:text-primary-600"
                onClick={() =>
                  toggleEditBrandDrawer(true, () => {
                    setBrandToEditId(row._id);
                  })
                }
              />
              <span className="text-gray-500">|</span>
              <TrashIcon
                className="w-5 h-5 duration-200 cursor-pointer text-red-500/50 hover:text-red-500"
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
        if (res.ok) {
          setBrandsList(res.data);
        } else {
          toast.error("Failed to fetch!");
        }
      })
      .catch((err) => {
        toast.error("Something went wrong!");
        console.log(err);
      })
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
            Total: {brandsList?.total || 0}
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

      {/* Add Brand */}
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

      {/* Edit Brand */}
      <Drawer
        title="Edit Brand Details"
        open={editBrandDrawer}
        size="lg"
        onClose={() =>
          toggleEditBrandDrawer(false, () => {
            setTimeout(() => {
              setBrandToEditId("");
            }, 500);
          })
        }
      >
        <EditBrandForm
          token={user?.token}
          id={brandToEditId || ""}
          callback={() => {
            toggleEditBrandDrawer(false, () => {
              setTimeout(() => {
                setBrandToEditId("");
              }, 500);
            });
            fetchAllBrands();
          }}
        />
      </Drawer>
    </div>
  );
};

export default BrandsView;
