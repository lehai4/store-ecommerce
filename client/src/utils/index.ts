export const slugify = (str: string) => {
  return str
    .normalize("NFD") // tách dấu
    .replace(/[\u0300-\u036f]/g, "") // xóa dấu
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // thay khoảng trắng bằng dấu -
    .replace(/[^a-z0-9\-]/g, ""); // xóa ký tự đặc biệt
};
