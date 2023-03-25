import AdminStore from "./AdminStore";
import PermissionStore from "./PermissionStore";
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    admin: new AdminStore(),
    permissionStore: new PermissionStore()
}
