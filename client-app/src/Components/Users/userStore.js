import {observable, action} from "mobx";
import agent from "../../agent";
import authStore from "../Auth/authStore";
import {toast} from "react-toastify";

class UserStore {
    @observable currentUser;
    @observable loadingUser;
    @observable uploadingPhoto = false;
    
    @action pullUser() {
        this.loadingUser = true;
        this.currentUser = {}
    }
    
    @action forgetUser() {
        this.currentUser = undefined;
    }
    
    @action addPhoto = async (photo) => {
        this.uploadingPhoto = true;
        try {
            const response = await agent.User.addPhoto(photo);
            authStore.currentUser.photos.push(response);
            this.uploadingPhoto = false;
            toast.success('Photo uploaded successfully');
        } catch (err) {
            toast.error(err)
        }
    };
    
    @action setMainPhoto = async (photo) => {
        try {
            await agent.User.setMainPhoto(photo);
            authStore.setMainPhoto(photo);
        } catch (err) {
            console.log(err);
        }
    };
    
    @action deletePhoto = async (photo) => {
      try {
          await agent.User.deletePhoto(photo);
          authStore.currentUser.photos = authStore.currentUser.photos.filter(p => p.id !== photo.id);
      }  catch (err) {
          console.log(err);
      }
    };
    
    @action updateUser = async (user) => {
        try {
            return await agent.User.updateUser(user);
        } catch (err) {
            console.log(err)
        }
    }
}

export default new UserStore();