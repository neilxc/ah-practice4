import activityForm from './setup/activityFormSetup';
import chatForm from './setup/chatForm';
import forgotPassword from './setup/forgotPassword';
import changePassword from './setup/changePassword';
import Form from './extend';

class ActivityForm extends Form {}
class ChatForm extends Form {}
class ForgotPassword extends Form {}
class ChangePassword extends Form {}

export default {
    activityForm: new ActivityForm({...activityForm.fields}, {...activityForm.hooks}),
    chatForm: new ChatForm({...chatForm.fields}, {...chatForm.hooks}),
    forgotPassword: new ForgotPassword({...forgotPassword.fields}, {...forgotPassword.hooks}),
    changePassword: new ChangePassword({...changePassword.fields}, {...changePassword.hooks})
}