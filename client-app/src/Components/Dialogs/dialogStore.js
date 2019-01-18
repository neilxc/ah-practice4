import {action, observable} from "mobx";

class DialogStore {
    @observable dialogOpen = false;
    @observable currentDialog = null;

    @action openDialog = (dialogType) => {
        this.currentDialog = dialogType;
        this.dialogOpen = true;
    };
    
    @action closeDialog = () => {
        this.dialogOpen = false;
        this.currentDialog = null;
    };
}

export default new DialogStore();