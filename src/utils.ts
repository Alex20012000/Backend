export function getIdArray(data: { id: number }[]) {
  return data.map((record) => {
    return record.id;
  });
}

export function getIdArrayAutor(data: { id_author: number }[]) {
  return data.map((record) => {
    return record.id_author;
  });
}

export function getIdArrayCategory(data: { id_category: number }[]) {
  return data.map((record) => {
    return record.id_category;
  });
}
