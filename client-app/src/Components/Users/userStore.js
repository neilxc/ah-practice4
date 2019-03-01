import {observable, action} from "mobx";
import agent from "../../agent";
import authStore from "../Auth/authStore";
import {toast} from "react-toastify";

class UserStore {
    @observable profile;
    @observable loading;
    @observable followLoading;
    @observable uploadingPhoto = false;
    @observable followedPeople = null;
    
    @action pullUser() {
        this.loading = true;
        this.currentUser = {}
    }
    
    @action forgetUser() {
        this.currentUser = undefined;
    }
    
    @action addPhoto = async (photo) => {
        console.log(photo);
        this.uploadingPhoto = true;
        try {
            const response = await agent.User.addPhoto(photo);
            console.log(response);
            authStore.currentUser.photos.push(response);
            this.uploadingPhoto = false;
            return response;
        } catch (err) {
            toast.error(err)
        }
    };
    
    @action setMainPhoto = async (photo) => {
        try {
            this.loading = true;
            await agent.User.setMainPhoto(photo);
            authStore.setMainPhoto(photo);
            this.loading = false;
        } catch (err) {
            console.log(err);
            this.loading = false;
        }
    };
    
    @action deletePhoto = async (photo) => {
      try {
          this.loading = true;
          await agent.User.deletePhoto(photo);
          authStore.currentUser.photos = authStore.currentUser.photos.filter(p => p.id !== photo.id);
          this.loading = false;
      }  catch (err) {
          console.log(err);
          this.loading = false;
      }
    };
    
    @action updateUser = async (user) => {
        this.loading = true;
        try {
            const updatedUser = await agent.User.updateUser(user);
            this.loading = false;
            return updatedUser;
        } catch (err) {
            console.log(err);
            this.loading = false;
        }
    };
    
    @action loadProfile = async (username) => {
        this.loading = true;
        try {
            this.profile = await agent.Profiles.get(username);
            this.loading = false;
        } catch (err) {
            console.log(err);
        }
    };
    
    @action followUser = async (username) => {
        this.followLoading = true;
        try {
            await agent.Profiles.follow(username);
            this.profile.following = true;
            this.profile.followersCount++;
            this.followLoading = false;
        } catch (err) {
            this.followLoading = false;
            console.log(err);
        }
    };
    
    @action unfollowUser = async (username) => {
        this.followLoading = true;
        try {
            await agent.Profiles.unfollow(username);
            this.profile.following = false;
            this.profile.followersCount--;
            this.followLoading = false;
        } catch (err) {
            console.log(err);
            this.followLoading = false;
        }
    };
    
    @action listFollowings = async (username, type) => {
        this.followLoading = true;
        try {
            this.followedPeople = null;
            this.followedPeople = await agent.Profiles.list(username, type);
            this.followLoading = false;
        } catch (err) {
            this.followLoading = false;
            console.log(err);
        }
    }
}

export default new UserStore();