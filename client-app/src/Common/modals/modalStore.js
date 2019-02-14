import {action, observable} from "mobx";

class ModalStore {
    @observable modal = {
        open: false,
        header: null,
        component: null,
        content: null,
    };

    @action openModal = (props) => {
        this.modal.open = true;
        this.modal.component = props.component;
        this.modal.content = props.content;
        this.modal.header = props.header;
    };

    @action closeModal = () => {
        this.modal.open = false;
        this.modal.component = null;
        this.modal.content = null;
        this.modal.header = null;
    };
}

export default new ModalStore();