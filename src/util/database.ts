const Sequelize = require('sequelize')

// GET ENV VARIABLES FROM
const sequelizeInstance = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    dialect: 'postgres',
  },
)

export default sequelizeInstance
