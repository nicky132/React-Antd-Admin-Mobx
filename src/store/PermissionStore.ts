import {action, makeAutoObservable, observable, runInAction} from "mobx";
import {getAdminPermission} from "../api/permission";

interface IPermission {
    path: string
    title: string
}

class PermissionStore {
    @observable
    permissionList: IPermission[] = []
    @observable
    status: string = 'loading'

    constructor() {
        makeAutoObservable(this)
    }

    @action
    initPermission = async () => {
        const permissionList = await getAdminPermission().then(response => {
            return response.data.data
        })

        runInAction(() => {
            this.permissionList = permissionList
            this.status = 'finish'
        })
    }
}

export default PermissionStore