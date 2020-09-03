export function seed(knex) {
  return knex('user_todos').insert([
    {
      user_id: 1,
      todo_text: 'Go and receive grandmom from airport',
      is_completed: false,
      is_active: true
    },
    {
      user_id: 1,
      todo_text: 'Buy some breads from the store',
      is_completed: false,
      is_active: true
    },
    {
      user_id: 2,
      todo_text: "Buy cake for Henry's birthday",
      is_completed: false,
      is_active: true
    }
  ]);
}
