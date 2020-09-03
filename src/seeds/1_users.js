export function seed(knex) {
  return knex('users').insert([
    {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@domain.com',
      password: 'sample-password',
      is_active: true
    },
    {
      first_name: 'Lorem',
      last_name: 'Ipsum',
      email: 'lorem.ipsum@domain.com',
      password: 'sample-password',
      is_active: true
    }
  ]);
}
