import useReduxFetch from "../../customHooks/useReduxFetch";
import { DataGrid } from "@mui/x-data-grid";
import { GetUsers } from "./store";
import useModal from "../../customHooks/useModal";
import EditModal from "../../component/EditModal/EditModal";
import EditIcon from "@mui/icons-material/Edit";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { Box, ButtonBase, Modal } from "@mui/material";
import Admin from "../../request/api/Admin";
import "./Users.scss";

const columns = (setPayload, promote) => [
  { field: "fullName", headerName: "Name", width: 300 },
  { field: "email", headerName: "Email", width: 300 },
  { field: "dateBirthday", headerName: "Birthday", width: 200 },
  { field: "role", headerName: "Role", width: 100 },
  {
    field: "id",
    headerName: "",
    renderCell: ({ row }) => {
      return (
        row.role !== "ADMIN" && (
          <Box sx={{ display: "flex", flexDirection: "row", gap: ".5rem" }}>
            <ButtonBase onClick={() => setPayload(row)} className="edit-button">
              <EditIcon />
            </ButtonBase>
            <ButtonBase onClick={() => promote(row.id)} className="edit-button">
              <SupervisorAccountIcon />
            </ButtonBase>
          </Box>
        )
      );
    },
  },
];

export default function Users() {
  //react logic
  const { payload: pagination, fetch } = useReduxFetch(
    GetUsers,
    (state) => state.reducer.UsersPageSlice.users
  );
  const onEdit = (params) => {
    Admin.Update(params).then(fetch);
  };
  const promote = (id) => {
    Admin.Promote(id).then(fetch);
  };

  //component logic
  const { open, handleOpen, handleClose, payload } = useModal();

  return (
    <Box className="user-list-container">
      <DataGrid
        rows={pagination?.data ?? []}
        columns={columns(handleOpen, promote)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
      />
      <Modal open={open} onClose={handleClose}>
        <EditModal
          userInfo={payload}
          onSubmit={(params) => {
            onEdit({ ...params, id: payload.id });
            handleClose();
          }}
          onCancel={handleClose}
        />
      </Modal>
    </Box>
  );
}
