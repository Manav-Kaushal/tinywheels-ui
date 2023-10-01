import Button from "@components/Button";
import CopyToClipboard from "@components/CopyToClipboard";
import Drawer from "@components/Drawer";
import Modal from "@components/Modal";
import Table from "@components/Table";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { api } from "@src/services/api";
import { trimID } from "@utils/helpers";
import { Brand, Overlay, StateType } from "@utils/types/Brands";
import dayjs from "dayjs";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import AddBrandForm from "./AddBrandForm";
import EditBrandForm from "./EditBrandForm";

const BrandsView = () => {
  const [fetchingBrandsList, setFetchingBrandsList] = useState<boolean>(false);
  const [deletingBrand, setDeletingBrand] = useState<boolean>(false);
  const [brandsList, setBrandsList] = useState({
    list: [],
    total: 0,
  });
  const [brandToEdit, setBrandToEdit] = useState<Brand | null>(null);

  // Modals & Drawers
  const [state, setState] = useState<StateType>({
    modal: false,
    drawer: false,
  });

  const toggle = useCallback((type: Overlay, callback?: () => void) => {
    setState((prev) => ({ ...prev, [type]: !prev[type] }));
    if (callback) {
      callback();
    }
  }, []);

  const fetchBrands = useCallback(async () => {
    setFetchingBrandsList(true);
    try {
      const res = await api.getAllBrands();
      if (res.kind === "ok") {
        setBrandsList(res?.data);
      } else {
        throw new Error("Failed to fetch brands");
      }
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setFetchingBrandsList(false);
    }
  }, []);

  const deleteBrand = async (id: string) => {
    setDeletingBrand(true);
    try {
      const res = await api.deleteBrand(id);
      if (res.kind === "ok") {
        toast.success("Brand deleted");
        fetchBrands();
      } else {
        throw new Error("Failed to fetch brands");
      }
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setDeletingBrand(false);
    }
  };

  const columns: any = useMemo(
    () => [
      {
        Header: "Logo",
        accessor: (row: Brand) => {
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
        accessor: (row: Brand) => {
          return <p className="line-clamp-1">{row.name}</p>;
        },
      },
      {
        Header: "ID",
        accessor: (row: Brand) => {
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
        accessor: (row: Brand) => {
          return <p className="line-clamp-1">{row.country}</p>;
        },
      },
      {
        Header: "Year Founded",
        accessor: (row: Brand) => {
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
                onClick={() => {
                  setBrandToEdit(row);
                  toggle("drawer");
                }}
              />
              <span className="text-gray-500">|</span>
              <TrashIcon
                className="w-5 h-5 duration-200 cursor-pointer text-red-500/50 hover:text-red-500"
                onClick={() => deleteBrand(row._id)}
              />
            </div>
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    fetchBrands();
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
          <Button label="Refresh" onClick={() => fetchBrands()} size="sm" />
          <Button
            label="Add"
            size="sm"
            onClick={() => {
              toggle("modal");
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
        open={state.modal}
        onClose={() => toggle("modal")}
      >
        <AddBrandForm toggle={toggle} fetchBrands={fetchBrands} />
      </Modal>

      {/* Edit Brand */}
      <Drawer
        title="Edit Brand Details"
        open={state.drawer}
        size="lg"
        onClose={() =>
          toggle("drawer", () => {
            setTimeout(() => {
              setBrandToEdit(null);
            }, 500);
          })
        }
      >
        <EditBrandForm
          brandToEdit={brandToEdit}
          callback={() => {
            toggle("drawer", () => {
              setTimeout(() => {
                setBrandToEdit(null);
              }, 500);
            });
            fetchBrands();
          }}
        />
      </Drawer>
    </div>
  );
};

export default BrandsView;
