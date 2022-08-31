// TODO: Chưa xây dựng tính năng chat group nên tạm thời chỉ lấy ra 1 user trong cuộc hội thoại
export const getOtherUsers = (users, currentUserId) => {
  return users.filter((item) => item._id !== currentUserId)[0];
};
