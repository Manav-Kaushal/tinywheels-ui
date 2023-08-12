import Button from "@components/Button";
import Table from "@components/Table";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import api from "@utils/api";
import { BrandType } from "@utils/types/Brand";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

type Props = {};

const BrandsView = (props: Props) => {
  const [fetchingBrandsList, setFetchingBrandsList] = useState(false);
  const [brandsList, setBrandsList] = useState<{
    list: BrandType[];
    total: number;
  }>({ list: [], total: 0 });

  const columns: any = useMemo(
    () => [
      {
        Header: "Logo",
        accessor: (row: BrandType) => {
          return (
            <Image
              src={row.logo || ""}
              alt={row.name}
              width={48}
              height={48}
              className="object-contain p-1 border rounded-md aspect-1"
            />
          );
        },
      },
      {
        Header: "Name",
        accessor: (row: BrandType) => {
          return (
            <p className="duration-300 cursor-pointer line-clamp-1 hover:text-primary">
              {row.name}
            </p>
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
                // onClick={() => handleDelete(row._id)}
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
          <Button label="Refresh" onClick={() => {}} size="sm" />
          <Button label="Add" size="sm" />
        </div>
      </div>

      <div className="mt-6">
        <Table columns={columns} data={brandsList?.list || []} />
      </div>

      {/* <Modal
        title="Add brand"
        open={addBrandPanel}
        size="lg"
        onClose={() => hideAddBrandPanel()}
      >
        <AddBrandForm
          hideAddBrandPanel={hideAddBrandPanel}
          fetchAllBrands={fetchAllBrands}
        />
      </Modal>
      <Drawer
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
