import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";

// import { DeleteOutline } from "@material-ui/icons";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { useAccounts } from "../../Context/AccountsContext";
import Avatar from "@mui/material/Avatar";

export default function UserList() {
  const { accounts, setAccounts } = useAccounts();

  const handleDelete = (id) => {
    setAccounts(accounts.filter((item) => item.id !== id));
  };

  const handleStatusChange = (id) => {
    setAccounts(
      accounts.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "active" ? "inactive" : "active",
            }
          : item
      )
    );
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  const columns = [
    { field: "id", headerName: "ID", width: 92 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <Avatar
              {...stringAvatar(params.row.name)}
              className="userListImg"
            />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        // Check if role is admin
        if (params.row.role === "admin") {
          return <div>{params.row.status}</div>; // Just display status for admin
        }

        return (
          <div
            onClick={() => handleStatusChange(params.row.id)}
            style={{
              cursor: "pointer",
              color: params.row.status === "active" ? "green" : "red",
            }}
          >
            {params.row.status}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        // Check if role is admin
        if (params.row.role === "admin") {
          return null; // Don't render anything for admin
        }

        return (
          <>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={accounts}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
