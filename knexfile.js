// Update with your config settings.

module.exports = {
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
  },
  development: {
    client: 'pg',
    connection: process.env.DATABASE_DEV_URL,
  },
  test: {
    client: 'pg',
    connection: process.env.DATABASE_TEST_URL,
  },
}
