import Button from "@components/Button";
import CopyToClipboard from "@components/CopyToClipboard";
import Table from "@components/Table";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { trimID } from "@utils/helpers";
import { UserType } from "@utils/types/User";
import classNames from "classnames";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";

const UsersView = () => {
  const [fetchingUsersList, setFetchingUsersList] = useState<boolean>(false);
  const [deletingUser, setDeletingUser] = useState<boolean>(false);
  const [usersList, setUsersList] = useState<{
    list: UserType[];
    total: number;
  }>({ list: [], total: 0 });

  const [userToEdit, setUserToEdit] = useState<UserType | null>(null);

  // Modals & Drawers
  const [editUserDrawer, setEditUserDrawer] = useState(false);

  const toggleEditUserDrawer = (value: boolean, callback?: () => void) => {
    try {
      setEditUserDrawer(value);
      if (callback) {
        callback();
      }
    } catch (error) {
      console.error("Error toggling edit user drawer:", error);
    }
  };

  const columns: any = useMemo(
    () => [
      {
        Header: "ID",
        accessor: (row: UserType) => {
          return (
            <div>
              <span>{trimID(row._id)}</span>
              <CopyToClipboard textToCopy={row._id} message="ID Copied" />
            </div>
          );
        },
      },
      {
        Header: "Name",
        accessor: (row: UserType) => {
          return <p className="capitalize">{row.name}</p>;
        },
      },
      {
        Header: "Email",
        accessor: (row: UserType) => {
          return <p className="line-clamp-1">{row.email}</p>;
        },
      },
      {
        Header: "Role",
        accessor: (row: UserType) => {
          return <p>{row.role}</p>;
        },
      },
      {
        Header: "Is Active",
        accessor: (row: UserType) => {
          return (
            <p
              className={classNames(
                row.isActive ? "text-emerald-600" : "text-red-600"
              )}
            >
              {row.isActive ? "active" : "inactive"}
            </p>
          );
        },
      },
      {
        Header: "Created At",
        accessor: (row: UserType) => {
          return <p>{dayjs(row.createdAt).format("MMM DD, YYYY")}</p>;
        },
      },
      {
        Header: "Updated At",
        accessor: (row: UserType) => {
          return <p>{dayjs(row.updatedAt).format("MMM DD, YYYY")}</p>;
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
                  toggleEditUserDrawer(true, () => {
                    setUserToEdit(row);
                  })
                }
              />
            </div>
          );
        },
      },
    ],
    []
  );

  // const fetchAllUsers = useCallback(() => {
  //   setFetchingUsersList(true);
  //   api
  //     .get("/auth/all", undefined, {
  //       headers: {
  //         Authorization: `Bearer ${user?.token}`,
  //       },
  //     })
  //     .then((res: any) => {
  //       if (res.ok) {
  //         setUsersList(res.data);
  //       } else {
  //         toast.error("Failed to fetch!");
  //       }
  //     })
  //     .catch((err) => {
  //       toast.error("Something went wrong!");
  //       console.log(err);
  //     })
  //     .finally(() => {
  //       setFetchingUsersList(false);
  //     });
  // }, []);

  // const handleUserDelete = async (id: string) => {
  //   setDeletingUser(true);

  //   try {
  //     const response: any = await api.delete("/users/" + id);

  //     if (response.ok) {
  //       toast.success("User deleted successfully!");
  //       fetchAllUsers();
  //     } else {
  //       const errorMessage = response?.data?.message || "Something went wrong";
  //       toast.error(`User could not be deleted! Error: ${errorMessage}`);
  //       console.error("User deletion error:", errorMessage);
  //     }
  //   } catch (error) {
  //     toast.error(
  //       "An error occurred while deleting the user. Check console for more details."
  //     );
  //     console.error("Error deleting user:", error);
  //   } finally {
  //     setDeletingUser(false);
  //   }
  // };

  useEffect(() => {}, []);

  return (
    <div>
      <div className="flex items-center justify-between ">
        <div>
          <h4 className="font-medium text-primary-600">
            Total: {usersList?.total || 0}
          </h4>
        </div>
        <div className="flex items-center space-x-2">
          <Button label="Refresh" onClick={() => {}} size="sm" />
        </div>
      </div>

      <div className="mt-6">
        <Table
          columns={columns}
          data={usersList?.list || []}
          loading={fetchingUsersList || deletingUser}
        />
      </div>

      {/* Edit User */}
      {/* <Drawer
        title="Edit User Details"
        open={editUserDrawer}
        size="lg"
        onClose={() =>
          toggleEditUserDrawer(false, () => {
            setTimeout(() => {
              setUserToEdit(null);
            }, 500);
          })
        }
      >
        <EditUserForm
          token={user?.token}
          userToEdit={userToEdit}
          callback={() => {
            toggleEditUserDrawer(false, () => {
              setTimeout(() => {
                setUserToEdit(null);
              }, 500);
            });
            // fetchAllUsers();
          }}
        />
      </Drawer> */}
    </div>
  );
};

export default UsersView;
