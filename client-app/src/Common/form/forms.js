import activityForm from './setup/activityFormSetup';
import chatForm from './setup/chatForm';
import forgotPassword from './setup/forgotPassword';
import changePassword from './setup/changePassword';
import register from './setup/registerFormSetup';
import login from './setup/loginFormSetup';
import basic from './setup/basicFormSetup';
import photoUpload from './setup/photoUpload';
import Form from './extend';

class ActivityForm extends Form {}
class ChatForm extends Form {}
class ForgotPassword extends Form {}
class ChangePassword extends Form {}
class Register extends Form {}
class Login extends Form {}
class Basic extends Form {}
class PhotoUpload extends Form {}

export default {
    activityForm: new ActivityForm({...activityForm.fields}, {...activityForm.hooks}),
    chatForm: new ChatForm({...chatForm.fields}, {...chatForm.hooks}),
    forgotPassword: new ForgotPassword({...forgotPassword.fields}, {...forgotPassword.hooks}),
    changePassword: new ChangePassword({...changePassword.fields}, {...changePassword.hooks}),
    register: new Register({...register.fields}, {...register.hooks}),
    login: new Login({...login.fields}, {...login.hooks}),
    basic: new Basic({...basic.fields}, {...basic.hooks}),
    photoUpload: new PhotoUpload({...photoUpload})
}