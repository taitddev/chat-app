export const host = import.meta.env.VITE_SERVER_ENDPOINT;
export const loginRoute = `${host}/api/auth/login`;
export const registerRoute = `${host}/api/auth/register`;
export const logoutRoute = `${host}/api/auth/logout`;
export const getUsersRoute = `${host}/api/auth/users/search`;
export const allConversationsRoute = `${host}/api/conversations/getallconversations`;
export const getConversationRoute = `${host}/api/conversations/get-conversation`;
export const createNewConversation = `${host}/api/conversations/create-conversation`;
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const getMessageByConversationIdRoute = `${host}/api/messages/get-msg-by-conversation-id`;
export const setAvatarRoute = `${host}/api/auth/setavatar`;
