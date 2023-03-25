import {action, makeAutoObservable, observable, runInAction} from "mobx";
import {IAdmin} from "../pages/admin/AdminList";
import {getAdminInfo} from "../api/admin";

class AdminStore {
    @observable
    admin: IAdmin = {id: 0, adminName: '', createdAt: ''}
    @observable
    status: string = 'loading'

    constructor() {
        makeAutoObservable(this)
    }

    @action
    initAdmin = async () => {
        const admin = await getAdminInfo().then(response => {
            return observable.object(response.data.data)
        })
        runInAction(() => {
            this.admin = admin
            this.status = 'finish'
        })
    }
    @action
    changeAdmin = (admin: IAdmin) => {
        this.admin = admin
    }
}

export default AdminStore
